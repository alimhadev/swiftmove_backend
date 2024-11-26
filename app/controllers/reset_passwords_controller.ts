import Token from '#models/token'
import User from '#models/user'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/forgot_password'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
export default class ResetPasswordsController {


  async handleForgotPassword({ request, response }: HttpContext) {

    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', email.toLowerCase())

    if (!user || user.password === null) {


      return response.status(404).send({
        message: 'user not found'
      })

    }

    const token = stringHelpers.generateRandom(64)
    const url = `${env.get('FRONTEND_URL')}/reset-password?token=${token}&email=${email.toLowerCase()}`

    await Token.create({
      token,
      email: user.email.toLowerCase(),
      expiresAt: DateTime.now().plus({ minutes: 20 })

    })

    // email
    await mail.send((message) => {
      message
        .to(user.email.toLowerCase())
        .from('info@example.org')
        .subject('demande de reinitialisation de mot de passe ')
        .htmlView('forgot-password', { user, url })
    })

    return response.status(201).send({ message: 'email sent successfully' })
  }


  async handleResetPassword({ request, response }: HttpContext) {
    const { token, email, password } = await request.validateUsing(resetPasswordValidator)

    const tokenObj = await Token.findBy('token', token)

    if (!tokenObj || tokenObj.expiresAt < DateTime.now() || tokenObj.email !== email || !!tokenObj.isUsed === true) {

      return response.status(404).send({
        message: 'invalid token or expired'
      })
    }
    const user = await User.findBy('email', email)

    if (!user) {

      return response.status(404).send({
        message: 'user not found'
      })
    }
    await tokenObj.merge({ isUsed: true }).save()

    await user.merge({ password }).save()

    return response.status(200).send({ message: 'password changed successfully' })
  }



}
