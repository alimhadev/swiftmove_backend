import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {

    const user = ctx.auth.user

    if (!user || (!user.isAdmin && !user.isSuperAdmin)) {
      return ctx.response.status(403).send({ message: 'Unauthorized access' })
    }
    const output = await next()
    return output
  }
}
