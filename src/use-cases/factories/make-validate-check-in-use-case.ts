import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { env } from '@/env'

export function makeValidateCheckInUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const checkInsRepository = new InMemoryCheckInsRepository()
  
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
  }

  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
