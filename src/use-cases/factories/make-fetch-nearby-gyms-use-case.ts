import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'
import { env } from '@/env'

export function makeFetchNearbyGymsUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const gymsRepository = new InMemoryGymsRepository()
  
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
  }
  const gymsRepository = new PrismaGymRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
