import { Controller, Authorized, Get, QueryParam, Post, Body } from 'routing-controllers'
import 'reflect-metadata'
import { ProductService } from '../service'
import { CreatePurchaseDTO } from '../dto'

@Authorized()
@Controller()
class ProductController {
    productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    @Get('/product/list')
    getList(@QueryParam('page') page: number, @QueryParam('pageSize') pageSize: number) {
        return this.productService.getList(page, pageSize)
    }

    @Get('/product/items')
    getItems(@QueryParam('useCache') useCache: boolean) {
        return this.productService.getItems(useCache)
    }

    @Post('/product/purchase')
    create(@Body() createPurchaseDTO: CreatePurchaseDTO) {
        return this.productService.purchase(createPurchaseDTO)
    }
}
export default ProductController
