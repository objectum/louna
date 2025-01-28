export default async function request({
    url,
    method,
    headers,
}: {
    url?: string
    method: 'get' | 'post' | 'patch' | 'put' | 'delete'
    headers?: any
}) {
    const response = await fetch(url, {
        method,
        headers,
    })

    return response.json()
}
