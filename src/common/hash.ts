import { createHash } from 'crypto'

export default function hash(s: string): string {
    return createHash('sha1')
        .update(s + process.env.salt)
        .digest('hex')
}
