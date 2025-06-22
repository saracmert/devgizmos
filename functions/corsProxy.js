export async function onRequest(context) {
    const { request, env } = context;
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')
    if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'No url provided' }), { status: 400 })
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = `rate:${ip}`;
    const limit = 10;
    const windowSeconds = 60;

    if (env && env.RATE_LIMIT) {
        const now = Date.now();
        let entry = await env.RATE_LIMIT.get(key, { type: 'json' });
        if (!entry || now - entry.start > windowSeconds * 1000) {
            entry = { count: 1, start: now };
        } else {
            entry.count += 1;
        }
        await env.RATE_LIMIT.put(key, JSON.stringify(entry), { expirationTtl: windowSeconds + 5 });
        if (entry.count > limit) {
            return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), { status: 429 });
        }
    }

    try {
        const resp = await fetch(targetUrl, { headers: { 'User-Agent': 'DevgizmosBot/1.0 (+https://devgizmos.com/)' } })
        const html = await resp.text()
        
        const og = {}
        const tw = {}
        
        const ogKeys = [
            'og:title',
            'og:description',
            'og:image',
            'og:url',
            'og:site_name',
            'og:type'
        ]
        const twitterKeys = [
            'twitter:card',
            'twitter:title',
            'twitter:description',
            'twitter:image',
            'twitter:site',
            'twitter:creator'
        ]

        ogKeys.forEach(key => { og[key] = '' })
        twitterKeys.forEach(key => { tw[key] = '' })

        const metaRegex = /<meta\s+([^>]+)>/gi
        let match
        while ((match = metaRegex.exec(html))) {
            const attrs = match[1]
            const prop = /property=["']([^"']+)["']/.exec(attrs)
            const name = /name=["']([^"']+)["']/.exec(attrs)
            const content = /content=["']([^"']*)["']/.exec(attrs)
            if (content) {
                if (prop && prop[1].startsWith('og:')) og[prop[1]] = content[1]
                if (name && name[1].startsWith('twitter:')) tw[name[1]] = content[1]
            }
        }
        return new Response(JSON.stringify({ og, twitter: tw }), {
            headers: { 'content-type': 'application/json' }
        })
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 })
    }
}