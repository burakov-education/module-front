export default async function (method, path, body = null, token = null) {
    const url = `http://localhost/api-shop/public/api${path}`;

    const headers = {
        Accept: 'application/json',
        Client: 'my-login',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const options = {
        method: method,
        headers: headers,
    }

    if (body) {
        if (body instanceof FormData) {
            options.body = body
        } else {
            options.body = JSON.stringify(body)
            options.headers['Content-Type'] = 'application/json'
        }
    }

    const request = await fetch(url, options)

    try {
        return await request.json()
    } catch (e) {
        return null
    }
}
