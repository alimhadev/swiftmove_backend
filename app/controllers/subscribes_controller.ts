import InvestmentPlan from '#models/investment_plan'
import Subscribe from '#models/subscribe'
import User from '#models/user'
import { subscribeValidator, subscribeByUserValidator } from '#validators/subscribe'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubscribesController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    const subscribes = await Subscribe.query().orderBy('createdAt', 'desc').preload('user').preload('investmentPlan').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })



    return response.status(200).send(subscribes)
  }



  /**
   * Handle form submission for the create action
   */
  async store({ request,response,auth}: HttpContext) {

    const playload = await request.validateUsing(subscribeValidator)

    const user = await User.find(playload.userId)

    const user_2= await User.findOrFail(auth.user!.id)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }
     const investment_plan = await InvestmentPlan.find(playload.investmentPlanId)

    if (!investment_plan) {
      return response.status(404).send({
        message: 'investment_plan not found'
      })
    }

    if(user.solde < investment_plan.amount){
      return response.status(404).send({
        message: 'insufficient balance'
      })
    }

    const subscribe = await Subscribe.create({
      state:playload.state,
      leftDays:investment_plan.durationInDay
    })

    await subscribe.related('user').associate(user)
    await subscribe.related('investmentPlan').associate(investment_plan)
    await subscribe.related('created').associate(user_2)


    return response.status(200).send({message: 'subscribe created successfully'})

  }


  async subscribtionForUser({response,auth,request}: HttpContext) {
    try {
      const user = await User.findOrFail(auth.user!.id)

      const playload = await request.validateUsing(subscribeByUserValidator)

      const investment_plan = await InvestmentPlan.find(playload.investmentPlanId)

      if (!investment_plan) {
        return response.status(404).send({
          message: 'investment_plan not found'
        })
      }
      if(user.solde < investment_plan.amount){
        return response.status(404).send({
          message: 'insufficient balance'
        })
      }


      const subscribe = await Subscribe.create({
        state:'active',
        leftDays:investment_plan.durationInDay
      })


      await subscribe.related('user').associate(user)
      await subscribe.related('investmentPlan').associate(investment_plan)
      await subscribe.related('created').associate(user)

      user.solde -= investment_plan.amount
      await user.save()


      return response.status(200).send({message: 'subscribe created successfully'})

    }

    catch (error) {
      return response.status(404).send({
        message: 'something went wrong'
      })
    }


  }
async userIncrease({response,auth}: HttpContext) {

  const user = await User.find(auth.user!.id)

  if (!user) {
    return response.status(404).send({
      message: 'user not found'
    })
  }

  const increases =await Subscribe.query().where('user_id',auth.user!.id).preload('increases')

  return response.status(200).send(increases)

}

async UserSubscribtion({response,auth}: HttpContext) {

  const user = await User.find(auth.user!.id)

  if (!user) {
    return response.status(404).send({
      message: 'user not found'
    })
  }

  const subscribes = await Subscribe.query().where('user_id',auth.user!.id).preload('investmentPlan')

  return response.status(200).send(subscribes)

} // get user subscription


async totalInvestment({response,auth}: HttpContext) {

  const user = await User.find(auth.user!.id)

  if (!user) {
    return response.status(404).send({
      message: 'user not found'
    })
  }

  const subscribes = await Subscribe.query().where('user_id',auth.user!.id).preload('investmentPlan')
 let total = 0
  for (const subscribe of subscribes) {

    total += subscribe.investmentPlan.amount

  }
  return response.status(200).send({

    "total-investment":total})

}
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const subscribe = await Subscribe.find(params.id)

    if (!subscribe) {
      return response.status(404).send({
        message: 'subscribe not found'
      })
    }
    await subscribe.load('user')
    await subscribe.load('investmentPlan')

    await subscribe.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await subscribe.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })
    return response.status(200).send(subscribe)
  }



  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response,auth }: HttpContext) {
     const playload = await request.validateUsing(subscribeValidator)

    const subscribe = await Subscribe.find(params.id)

    if (!subscribe) {
      return  response.status(404).send({
        message: 'subscribe not found'
      })


    }

    const user = await User.find(playload.userId)



    if (!user) {
      return response.status(404).send({
        message: 'user not found'
      })
    }

    const investment_plan = await InvestmentPlan.find(playload.investmentPlanId)

    if (!investment_plan) {
      return response.status(404).send({
        message: 'investment_plan not found'
      })
    }

    subscribe.state = playload.state
    subscribe.updatedBy= auth.user!.id


    await subscribe.save()

    await subscribe.related('user').dissociate()
    await subscribe.related('investmentPlan').dissociate()

    await subscribe.related('user').associate(user)
    await subscribe.related('investmentPlan').associate(investment_plan)


    return response.status(200).send({message: 'subscribe updated successfully'})
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {

    const subscribe = await Subscribe.find(params.id)

    if (!subscribe) {
      return response.status(404).send({
        message: 'subscribe not found'
      })
    }

    await subscribe.delete()

    return response.status(200).send({message: 'subscribe deleted successfully'})
  }
}
