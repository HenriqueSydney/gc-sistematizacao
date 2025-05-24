import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from './../authenticate'
import { env } from '@/env'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

export function makeAuthenticateUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
  }
  
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
