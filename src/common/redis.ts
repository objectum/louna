import { createClient } from 'redis'

let client

export async function connect() {
    if (!client) {
        client = createClient()
        client.on('error', err => console.log('Redis Client Error', err))
        await client.connect()
    }
}

export async function redisSet(key: string, value: any) {
    await connect()
    await client.set(key, JSON.stringify(value))
}

export async function redisGet(key: string) {
    await connect()

    const value = await client.get(key)

    return JSON.parse(value)
}

export async function redisDel(key: string) {
    await connect()
    await client.del(key)
}
