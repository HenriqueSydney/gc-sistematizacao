import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { env } from '@/env'

export function makeFetchUserCheckInsHistoryUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
      const checkInsRepository = new InMemoryCheckInsRepository()
    
      const useCase = new FetchUserCheckInsUseCase(checkInsRepository)
  
      return useCase
    }
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsUseCase(checkInsRepository)

  return useCase
}
