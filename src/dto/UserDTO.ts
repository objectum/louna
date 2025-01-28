import { Omit } from 'utility-types'

type UserDTO = {
    id: number
    login: string
    password: string
    balance?: number
}
type CreateUserDTO = Omit<UserDTO, 'id'>
type UpdateUserDTO = Omit<UserDTO, 'id' | 'login'>

export { UserDTO, CreateUserDTO, UpdateUserDTO }
