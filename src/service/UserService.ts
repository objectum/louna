import { UserRepository } from '../repository'
import { AuthDTO, CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto'
import { hash } from '../common'

export default class UserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
        createUserDTO.password = hash(createUserDTO.password)

        return this.userRepository.create(createUserDTO)
    }

    async update(id: number, updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
        if (updateUserDTO.password) {
            updateUserDTO.password = hash(updateUserDTO.password)
        }
        return this.userRepository.update(id, updateUserDTO)
    }

    async auth(authDTO: AuthDTO): Promise<string> {
        if (authDTO.password) {
            authDTO.password = hash(authDTO.password)
        }
        return this.userRepository.auth(authDTO)
    }
}
