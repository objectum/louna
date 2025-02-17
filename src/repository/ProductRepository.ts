import { ProductDTO, PurchaseDTO, CreatePurchaseDTO } from '../dto'
import { query, getClient } from '../common'
import { BadRequestError } from 'routing-controllers'

export default class ProductRepository {
    async getList(page: number, pageSize: number): Promise<ProductDTO[]> {
        return query('select * from products order by id limit $1 offset $2', [pageSize, page * pageSize])
    }

    async purchase(createPurchaseDTO: CreatePurchaseDTO): Promise<PurchaseDTO> {
        const { productId, userId } = createPurchaseDTO
        const productRows = await query('select * from products where id = $1', [productId])
        const userRows = await query('select * from users where id = $1', [userId])

        if (!productRows.length) {
            throw new BadRequestError(`Unknown productId: ${productId}`)
        }
        if (!userRows.length) {
            throw new BadRequestError(`Unknown userId: ${userId}`)
        }
        const price = productRows[0].price
        const client = await getClient()

        try {
            await client.query('begin')

            const { rows: balanceRows } = await client.query('update users set balance = balance - $1 where id = $2 returning balance', [
                price,
                userId,
            ])
            const { rows: purchaseRows } = await client.query(
                'insert into purchases(date, "userId", "productId", price) values(now(), $1, $2, $3) returning id, date',
                [userId, productId, price],
            )
            await client.query('commit')

            return {
                id: purchaseRows[0].id,
                date: purchaseRows[0].date,
                productId,
                userId,
                price,
                balance: balanceRows[0].balance,
            }
        } catch(err) {
            await client.query('rollback')
            throw err
        } finally {
            client.release()
        }
    }
}
