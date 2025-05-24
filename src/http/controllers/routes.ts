import { FastifyInstance } from 'fastify'


import { healthCheck } from './healthCheck'

export async function healthRoute(app: FastifyInstance) {
  app.get('/health', healthCheck)
}
