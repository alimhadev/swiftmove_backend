// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'


import { inject } from '@adonisjs/core'
import User from '#models/user'
import { DateTime } from 'luxon'
import MailsSenderService from '#services/mail_sender_service'

@inject()
export default class AccountVerifsController {
  constructor( private readonly mailsSenderService:MailsSenderService) {

  }



  async verificationByMail({request, response}:HttpContext) {



    const {email} = request.only(['email'])
    const user = await User.findBy('email', email.toLowerCase())

    const email_lower = email.toLowerCase()

    if (!user) {
      return response.status(404).send({
        message: 'user not found'})

    }
    if(user.isVerified === true) {
      return response.status(404).send({
        message: 'user already verified'})
    }
    await this.mailsSenderService.sentVerifyMail(email_lower,user)

    return response.status(201).send({message: 'email sent successfully'})
  }

  // methode qui verifie le token d'un user ,l'url qui est utliser par le request est gerer via le front mais doit respect celui du back


  async verifyToken({request, response}:HttpContext) {
    const {token} = request.only(['token'])
    const user = await User.findBy('emailVerificationToken', token)
    const email = user?.email


    const email_lower = email?.toLowerCase()

    if (!user || user.tokenExpiresAt < DateTime.now()) {
      return response.status(404).send({
        message: 'invalid token or expired',
        email: email_lower

      })

    }

    user.isVerified = true
    user.emailVerificationToken = null
    await user.save()
    return response.status(200).send({message: 'email verified successfully'})
  }


}
