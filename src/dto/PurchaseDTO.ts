import { Omit } from 'utility-types'

type PurchaseDTO = {
    id: number
    date: Date
    productId: number
    userId: number
    price: number
    balance?: number
}
type CreatePurchaseDTO = Omit<PurchaseDTO, 'id' | 'date' | 'price' | 'balance'>

export { PurchaseDTO, CreatePurchaseDTO }
