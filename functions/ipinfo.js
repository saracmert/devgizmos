export async function onRequest(context) {
    const { request, env } = context;

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('client-ip') ||
      request.headers.get('remote-addr') ||
      '';
    
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

    const cf = request.cf || {};

    const userAgent = request.headers.get('user-agent') || '';
    const tlsVersion = cf.tlsVersion || request.headers.get('cf-tls-version') || '';
    const httpProtocol = cf.httpProtocol || request.headers.get('x-forwarded-proto') || request.headers.get('cf-visitor') || '';
    const asn = cf.asn || '';
    const asOrganization = cf.asOrganization || '';
    const country = cf.country || '';
    const city = cf.city || '';
    const region = cf.region || '';
    const timezone = cf.timezone || '';
    const colo = cf.colo || '';
    const postalCode = cf.postalCode || '';
    const latitude = cf.latitude || '';
    const longitude = cf.longitude || '';

    return new Response(
      JSON.stringify({
        ip,
        userAgent,
        tlsVersion,
        httpProtocol,
        asn,
        asOrganization,
        country,
        city,
        region,
        timezone,
        colo,
        postalCode,
        latitude,
        longitude
      }, null, 2),
      {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*'
        }
      }
    );
}