import User from '#models/user'
import Withdrawal from '#models/withdrawal'
import { withdrawalValidator, withdrawalByUserValidator } from '#validators/withdrawal'
import type { HttpContext } from '@adonisjs/core/http'


export default class WithdrawalsController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {

    const withdrawals = await Withdrawal.query().orderBy('createdAt', 'desc').preload('user').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.send(withdrawals)
  }


  /**
   * Handle form submission for the create action
   */
  async store({ request,response ,auth}: HttpContext) {

    const playload = await request.validateUsing(withdrawalValidator)

    const user = await User.find(playload.userId)

    const user_2= await User.findOrFail(auth.user!.id)


    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }

    if(user.solde < playload.amount){
      return response.status(400).json({
        message:'insufficient balance '
      })

    }

    const fee = playload.amount * 0.1
    const netAmount = playload.amount + fee

    const withdrawal =  await Withdrawal.create({
      amount: playload.amount,
      method: playload.method,
      cost: netAmount,
      phoneNumber: playload.phoneNumber
    })


    await withdrawal.related('user').associate(user)
    await withdrawal.related('created').associate(user_2)


    return response.status(200).send({message: 'withdrawal created successfully'})
  }

  async withDrawalsForUser({response,auth,request}: HttpContext) {

      const user = await User.findOrFail(auth.user!.id)

      const playload =  await request.validateUsing(withdrawalByUserValidator)

      if(user.solde < playload.amount){
        return response.status(400).json({
          message:'insufficient balance '
        })

      }

      const fee = playload.amount * 0.1
      const netAmount = playload.amount + fee

      if(netAmount > user.solde){
        return response.status(400).json({
          message:"insufficient balance,don't forget withdrawal cost is 10 % , your balance is ".concat(user.solde.toString())
        })
      }


   const withdrawal =  await Withdrawal.create({
        amount: playload.amount,
        method: playload.method,
        cost: fee,
        phoneNumber: playload.phoneNumber
      })



      await withdrawal.related('user').associate(user)
      await withdrawal.related('created').associate(user)


      return response.status(200).send({message: 'withdrawal created successfully'})

  }

  async withdrawalsRequestList({response}: HttpContext) {

    const withdrawals = await Withdrawal.query().where('isValidated',false).orderBy('createdAt', 'desc').preload('user').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(withdrawals)
  }

  async validateWithdrawal({params,response}: HttpContext) {

    const withdrawal = await Withdrawal.find(params.id)


    if (!withdrawal) {
      return response.status(404).send({
        message: 'withdrawal not found'
      })
    }

    await withdrawal!.load('user')

    const userId = withdrawal!.user.id

    const user = await User.findOrFail(userId)
    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }

    withdrawal.isValidated=true
    await withdrawal.save()
    const netAmount = Number(withdrawal.amount!) + Number(withdrawal.cost!)
    user.solde-=netAmount
    user.save()
    return response.status(200).send({message: 'withdrawal validated successfully'})

  }

  async withdrawalByUser({response,auth}: HttpContext) {

    const withdrawals = await Withdrawal.query().where('user_id',auth.user!.id).orderBy('createdAt', 'desc')

    return response.status(200).send(withdrawals)

  }
  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {

    const withdrawal = await Withdrawal.find(params.id)

    if (!withdrawal) {
      return response.status(404).send({
        message: 'withdrawal not found'
      })
    }

    await withdrawal.load('user')

    await withdrawal.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await withdrawal.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })
    return response.status(200).send(withdrawal)
  }



  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request ,response,auth}: HttpContext) {

  //   const playload = await request.validateUsing(withdrawalValidator)

  //   const withdrawal = await Withdrawal.find(params.id)

  //   if (!withdrawal) {
  //     return response.status(404).send({
  //       message: 'withdrawal not found'
  //     })
  //   }

  //   const user = await User.find(playload.userId)

  //   if (!user) {
  //     return response.status(404).send({
  //       message: 'user not found'
  //     })
  //   }

  //   withdrawal.amount = playload.amount
  //   withdrawal.method = playload.method
  //   withdrawal.cost = playload.cost
  //   withdrawal.phoneNumber = user.phoneNumber
  //   withdrawal.updatedBy = auth.user!.id
  //   await withdrawal.save()

  //   await withdrawal.related('user').dissociate()
  //   await withdrawal.related('user').associate(user)

  //   return response.status(200).send({message: 'withdrawal updated successfully'})
  // }

  /**
   * Delete record
   */
  async destroy({ params ,response}: HttpContext) {

    const withdrawal = await Withdrawal.find(params.id)

    if (!withdrawal) {
      return response.status(404).send({
        message: 'withdrawal not found'
      })
    }

    await withdrawal.delete()

    return response.status(200).send({message: 'withdrawal deleted successfully'})
  }
}
