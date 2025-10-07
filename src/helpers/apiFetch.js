export default async function (method, path, body = null, token = null) {
    const url = `http://localhost/api-shop/public/api${path}`;

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
        options.body = JSON.stringify(body)
    }

    const request = await fetch(url, options)

    return await request.json()
}
