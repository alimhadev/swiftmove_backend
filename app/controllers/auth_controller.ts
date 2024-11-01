import { inject } from '@adonisjs/core'
import User from '#models/user'
import FileUploaderService from '#services/file_uploader_service'
import { loginValidation, registerValidation } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'crypto'
// import stringHelpers from '@adonisjs/core/helpers/string'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'


@inject()
export default class AuthController {

  constructor( private readonly fileUploaderService: FileUploaderService) {

  }

  /**
   * Handle user registration
   * creation de l'utilisateur et envoie d'un lien de verification
   *
   */
   async register( {request, response}: HttpContext) {

    try {
      const {firstname, lastname, email, password, avatar, solde,phoneNumber} = await request.validateUsing(registerValidation)

      const filePath = await this.fileUploaderService.upload(avatar,'avatar_'.concat(firstname,lastname),'users')

       const verification_token = randomUUID()

      //const verification_token = stringHelpers.generateRandom(64)

        const url = `http://localhost:3000/confirm-email?confirmation_token=${verification_token}`


          // const url = `http://localhost:3333/api/v1/verify-email?token=${verification_token}`

      const email_lower = email.toLowerCase()

      const user = await User.create({
        firstname:firstname,
        lastname:lastname,
        email:email_lower,
        password:password,
        avatar:filePath,
        solde:solde,
        phoneNumber:phoneNumber,
        emailVerificationToken : verification_token,
        tokenExpiresAt:DateTime.now().plus({minutes: 20})
      })

        const mailer= await  mail.send((message) => {
        message
          .from('swiftmove@example.com')
          .to(email_lower)
          .subject('Email Verification')
          .htmlView('email-verification', {user, url})

      })

      if(!mailer) {
        return response.status(404).send({
          message: 'email not sent'
        })
      }

      return response.status(201).json({message: 'User created successfully'})

    } catch (error) {

      throw error
    }



  }
  /**
   * Handle user login
   *
   *
   */




  async login( {request,response}: HttpContext) {

    const {email,password} = await request.validateUsing(loginValidation)

     const email_lower = email.toLowerCase()
     const user = await User.verifyCredentials(email_lower,password)

     if(user.isVerified === false) {

      return response.status(404).send({
        message: 'email not verified'
      })

     }

     const token = await User.accessTokens.create(user)

     return response.status(200).send({user,token})
  }






  async logout({auth,response}:HttpContext) {

    const user = auth.getUserOrFail()
     const token = user.currentAccessToken.identifier

     if(!token) {
       return response.unauthorized({ message: 'token not found' })
     }

    await User.accessTokens.delete(user,token)

    return response.ok({ message: 'Logged out' })

  }

















}

