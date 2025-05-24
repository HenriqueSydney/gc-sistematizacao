import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { env } from '@/env'

export function makeRegisterUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new RegisterUseCase(usersRepository)

    return authenticateUseCase
  }
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
