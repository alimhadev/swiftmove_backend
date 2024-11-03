import Reactivation from '#models/reactivation'
import Subscribe from '#models/subscribe'
import User from '#models/user'
import { reactivationValidator } from '#validators/reactivation'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ReactivationsController {

  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {

    const reactivations = await Reactivation.query().orderBy('createdAt', 'desc').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(reactivations)


  }


  /**
   * Handle form submission for the create action
   */
  async store({ request,response,auth }: HttpContext) {

    const playload = await request.validateUsing(reactivationValidator)



    const user = await User.findOrFail(auth.user!.id)

    const subscribe = await Subscribe.query().where('id',playload.subscribeId).where('user_id',auth.user!.id).first()


    if (!subscribe) {
      return response.status(404).send({
        message: 'subscribe not found for this user'
      })
    }
    if(subscribe.state === 'active'){

      return response.status(404).send({
        message: 'subscribe already active'
      })
    }


     const reactivation =  new Reactivation()

      await reactivation.related('subscribe').associate(subscribe)

      await reactivation.related('created').associate(user)

      subscribe.state='active'

      subscribe.lastActivity = DateTime.now()

      await subscribe.save()

      return response.status(200).send({message: 'reactivation created successfully'})

  }

  async  reactivationListByUser({response,auth}: HttpContext) {


    const reactivations = await Reactivation.query().orderBy('createdAt', 'desc').preload('subscribe',(query) =>{

      query.where('user_id',auth.user!.id).preload('investmentPlan')
    })

    return response.status(200).send(reactivations)

  }
  /**
   * Show individual record
   */


  async show({ params, response }: HttpContext) {

    const reactivation = await Reactivation.find(params.id)

    if (!reactivation) {
      return response.status(404).send({
        message: 'reactivation not found'
      })
    }
    await reactivation.load('subscribe')

    await reactivation.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await reactivation.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(reactivation)
  }


  /**
   * Handle form submission for the edit action
   */
  async update({ params, request ,response,auth}: HttpContext) {

    const playload = await request.validateUsing(reactivationValidator)

    const reactivation = await Reactivation.find(params.id)



    if (!reactivation) {
      return response.status(404).send({
        message: 'reactivation not found'
      })
    }

    reactivation.updatedBy = auth.user!.id
    // reactivation.merge(playload)

    await reactivation.save()

    const subscribe = await Subscribe.find(playload.subscribeId)



    if (!subscribe) {
      return response.status(404).send({
        message: 'subscribe not found'
      })
    }

    reactivation.related('subscribe').dissociate()

    await reactivation.related('subscribe').associate(subscribe)


    return response.status(200).send({message: 'reactivation updated successfully'})


  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {

    const reactivation = await Reactivation.find(params.id)

    if (!reactivation) {
      return response.status(404).send({
        message: 'reactivation not found'
      })
    }

    await reactivation.delete()

    return response.status(200).send({message: 'reactivation deleted successfully'})

  }
}
