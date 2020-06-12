import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './router.ts'
import { oakCors } from 'https://deno.land/x/cors/mod.ts'

const app = new Application()

const port = 800
app.use(oakCors())

app.use(router.routes())
app.use(router.allowedMethods())
app.listen({ port })

console.log(`server now running on port ${port}`)