import { UserDTO, CreateUserDTO, UpdateUserDTO, AuthDTO } from '../dto'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { query, hash, addUserSession } from '../common'

export default class UserRepository {
    async findByIdOrThrowException(id: number): Promise<UserDTO> {
        const rows = await query('select * from users where id = $1', [id])

        if (!rows.length) {
            throw new NotFoundError(`Unknown userId: ${id}`)
        }
        return rows[0] as UserDTO
    }

    async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
        const { login, password, balance } = createUserDTO
        const rows = await query('insert into users(login, password, balance) values($1, $2, $3) returning id', [
            login,
            password,
            balance,
        ])

        return Object.assign({ id: rows[0].id }, createUserDTO)
    }

    async update(id: number, updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
        const { password, balance } = updateUserDTO
        const userDTO: UserDTO = await this.findByIdOrThrowException(id)

        if (!password && !balance) {
            return userDTO
        }
        userDTO.password = password
        userDTO.balance = balance

        await query('update users set password = $1, balance = $2 where id = $3', [
            userDTO.password,
            userDTO.balance,
            id,
        ])

        return userDTO
    }

    async auth(authDTO: AuthDTO): Promise<string> {
        const { login, password } = authDTO
        const rows = await query('select * from users where login = $1 and password = $2', [login, password])

        if (!rows.length) {
            throw new UnauthorizedError(`Not authorized`)
        }
        const sessionId = hash(`${new Date().toISOString()}${process.env.salt}`)

        addUserSession(sessionId, rows[0].id)

        return sessionId
    }
}
