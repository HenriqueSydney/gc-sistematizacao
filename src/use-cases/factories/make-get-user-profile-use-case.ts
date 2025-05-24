import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { env } from '@/env'

export function makeGetUserProfileUseCase() {
   if(['staging', 'production'].includes(env.NODE_ENV)){
      const usersRepository = new InMemoryUsersRepository()
      const authenticateUseCase = new GetUserProfileUseCase(usersRepository)
  
      return authenticateUseCase
    }
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
