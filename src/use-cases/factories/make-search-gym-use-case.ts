import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { env } from '@/env'

export function makeSearchGymsUseCase() {
  if(['staging', 'production'].includes(env.NODE_ENV)){
    const gymsRepository = new InMemoryGymsRepository()
  
    const useCase = new SearchGymUseCase(gymsRepository)

    return useCase
  }
  
  const gymsRepository = new PrismaGymRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
