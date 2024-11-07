import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SuperAdminRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {

    const user = ctx.auth.user

    if (!user  || user.isSuperAdmin == false) {
      return ctx.response.status(403).send({ message: 'Unauthorized access' })
    }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
