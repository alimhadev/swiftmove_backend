import Deposit from '#models/deposit'
import User from '#models/user'
import { depositValidator, depositByUserValidator } from '#validators/deposit'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import FileUploaderService from '#services/file_uploader_service'
import { DateTime } from 'luxon'
@inject()
export default class DepositsController {
  /**
   * Display a list of resource
   */

  constructor( private readonly fileUploaderService: FileUploaderService) {

  }
  async index({response}: HttpContext) {

    const deposits = await Deposit.query().orderBy('createdAt', 'desc').preload('user').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })




    return response.status(200).send(deposits)
  }


  /**
   * Handle form submission for the create action
   */


  async depositForUser({response,auth,request}: HttpContext) {

    const playload = await request.validateUsing(depositByUserValidator)


    const user = await User.findOrFail(auth.user!.id)

    if(playload.amount<700){
      return response.status(400).send({
        message: 'minimum amount is 700 CFA'
      })
    }
    const files = await this.fileUploaderService.upload(playload.photo,'deposit'.concat(DateTime.now().toString()),  'deposits')

    const deposit = await Deposit.create({
      amount: playload.amount,
      method: playload.method,
      photo: files
    })


    await deposit.related('user').associate(user)
    await deposit.related('created').associate(user)

    return response.status(200).send({message: 'deposit demand created successfully'})

  }

  async depositRequestList({response}: HttpContext) {

    const deposits = await Deposit.query().where('isValidated',false).orderBy('createdAt', 'desc').preload('user').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(deposits)
  }

  async validateDeposit({params,response}: HttpContext) {

    const deposit = await Deposit.find(params.id)

    await deposit!.load('user')

    const userId = deposit!.user.id

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }

    if (!deposit) {
      return response.status(404).send({
        message: 'deposit not found'
      })
    }

    deposit.isValidated=true
    await deposit.save()

    user.solde+=Number(deposit.amount)
    user.save()

    return response.status(200).send({message: 'deposit validated successfully'})
  }

  async depositByUser({response,auth}: HttpContext) {

    const deposits = await Deposit.query().where('user_id',auth.user!.id).orderBy('createdAt', 'desc')

    return response.status(200).send(deposits)

  }

  async getFile({params,response}: HttpContext) {


    const filename = params.filename

    const path = `public/deposits/${filename}`

    response.header('Content-Type', 'image/jpg/png/jpeg',)

    return response.download(path)
  }
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const deposit = await Deposit.find(params.id)

    if (!deposit) {
      return response.status(404).send({
        message: 'deposit not found'
      })
    }

    await deposit.load('user')
    await deposit.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await deposit.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })
    return response.status(200).send(deposit)
  }


  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response,auth }: HttpContext) {

    const playload = await request.validateUsing(depositValidator)

    const deposit = await Deposit.find(params.id)



    if (!deposit) {
      return response.status(404).send({
        message: 'deposit not found'
      })
    }

    const user = await User.find(playload.userId)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }

    deposit.amount = playload.amount
    deposit.method = playload.method
    deposit.updatedBy = auth.user!.id
    await deposit.save()

    await deposit.related('user').dissociate()
    await deposit.related('user').associate(user)

    return response.status(200).send({message: 'deposit updated successfully'})


  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {

    const deposit = await Deposit.find(params.id)

    if (!deposit) {
      return response.status(404).send({
        message: 'deposit not found'
      })
    }

    await deposit.delete()

    return response.status(200).send({message: 'deposit deleted successfully'})
  }
}
