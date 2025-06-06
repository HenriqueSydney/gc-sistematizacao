import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'staging', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  BASE_TEST_URL: z.string().default('')
})

const _env = envSchema.safeParse(process.env)
console.log(_env.data)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
