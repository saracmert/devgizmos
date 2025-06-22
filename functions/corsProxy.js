export async function onRequest(context) {
    const { request } = context;
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')
    if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'No url provided' }), { status: 400 })
    }
    try {
        const resp = await fetch(targetUrl, { headers: { 'User-Agent': 'DevgizmosBot/1.0 (+https://devgizmos.com/)' } })
        const html = await resp.text()
        
        const og = {}
        const tw = {}
        const metaRegex = /<meta\s+([^>]+)>/gi
        let match
        while ((match = metaRegex.exec(html))) {
            const attrs = match[1]
            const prop = /property=["']([^"']+)["']/.exec(attrs)
            const name = /name=["']([^"']+)["']/.exec(attrs)
            const content = /content=["']([^"']+)["']/.exec(attrs)
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