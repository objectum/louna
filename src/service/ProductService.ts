import { ProductDTO, PurchaseDTO, CreatePurchaseDTO } from '../dto'
import { request, redisSet, redisGet, redisDel, log } from '../common'
import { ProductRepository } from '../repository'

export default class ProductService {
    productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    async getList(page: number, pageSize: number): Promise<ProductDTO[]> {
        return this.productRepository.getList(page, pageSize)
    }

    async getItems(useCache: boolean): Promise<ProductDTO[]> {
        const data = []

        if (useCache) {
            const data0 = await redisGet('data0')
            const data1 = await redisGet('data1')

            if (!!data0 && !!data1) {
                log.info('cache used')

                data.push(data0)
                data.push(data1)
            }
        }
        if (!data.length) {
            for (let i = 0; i <= 1; i++) {
                const params = new URLSearchParams({
                    app_id: '730',
                    currency: 'EUR',
                    tradable: `${i}`,
                })
                const value = await request({
                    url: `https://api.skinport.com/v1/items?${params}`,
                    method: 'get',
                    headers: {
                        'Accept-Encoding': 'br',
                    },
                })
                data.push(value)

                if (useCache) {
                    await redisSet(`data${i}`, value)
                } else {
                    await redisDel(`data${i}`)
                }
            }
        }
        return data.map(items =>
            items.reduce((minItem, item) => {
                if (
                    (minItem.suggested_price === null && item.suggested_price !== null) ||
                    (minItem.suggested_price !== null &&
                        item.suggested_price !== null &&
                        item.suggested_price < minItem.suggested_price)
                ) {
                    return item
                } else {
                    return minItem
                }
            }, items[0]),
        )
    }

    async purchase(createPurchaseDTO: CreatePurchaseDTO): Promise<PurchaseDTO> {
        return this.productRepository.purchase(createPurchaseDTO)
    }
}
