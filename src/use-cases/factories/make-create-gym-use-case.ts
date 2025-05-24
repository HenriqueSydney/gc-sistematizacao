import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { env } from '@/env'

export function makeCreateGymUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const gymsRepository = new InMemoryGymsRepository()
  
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
  }

  const gymsRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
