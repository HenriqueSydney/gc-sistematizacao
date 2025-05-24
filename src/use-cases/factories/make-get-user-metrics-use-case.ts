import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { env } from '@/env'

export function makeGetUserMetricsUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const checkInsRepository = new InMemoryCheckInsRepository()
  
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
  }
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
