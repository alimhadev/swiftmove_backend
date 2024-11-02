// import { writeFile } from 'fs/promises'
// import { toPng } from "jdenticon";
// import app from '@adonisjs/core/services/app'
// import { cuid } from '@adonisjs/core/helpers';
// import { MultipartFile } from '@adonisjs/core/bodyparser';

import User from "#models/user";
import Env  from '#start/env'


import mail from "@adonisjs/mail/services/main";
import { randomUUID } from "crypto";
import { DateTime } from "luxon";

export default class MailsSenderService {

  // service qui permet de generer un lien de confirmation d'email avec non creation de compte

  async sentVerifyMail( email:string,user:User){


       const verification_token = randomUUID()

       const  frontUrl =Env.get('FRONT_URL')

       const url = `${frontUrl}/confirm-email?confirmation_token=${verification_token}`

        // const url = `http://localhost:3333/api/v1/verify-email?token=${verification_token}`

      await user.merge({
        emailVerificationToken : verification_token,
        tokenExpiresAt:DateTime.now().plus({minutes: 20})
      }).save()

      await  mail.send((message) => {
        message
          .from('swiftmove@example.com')
          .to(email)
          .subject('Email Verification')
          .htmlView('email-verification', {user, url})

      })

  }



}
