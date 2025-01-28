import { Body, Controller, Post, Put, Authorized, QueryParam } from 'routing-controllers'
import 'reflect-metadata'
import { UserService } from '../service'
import { AuthDTO, CreateUserDTO, UpdateUserDTO } from '../dto'
import { getSessionUserId } from '../common'

@Authorized()
@Controller()
class UserController {
    userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    @Post('/user')
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO)
    }

    @Put('/user')
    update(@QueryParam('sessionId') sessionId: string, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.update(getSessionUserId(sessionId), updateUserDTO)
    }

    @Post('/auth')
    auth(@Body() authDTO: AuthDTO) {
        return this.userService.auth(authDTO)
    }
}
export default UserController
