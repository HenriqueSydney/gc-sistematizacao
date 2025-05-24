import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { env } from '@/env'

export function makeCheckInUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const checkInsRepository = new InMemoryCheckInsRepository()
    const gymsRepository = new InMemoryGymsRepository()
  
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
  }

  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
