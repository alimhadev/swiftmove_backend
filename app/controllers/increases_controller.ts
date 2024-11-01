import Increase from '#models/increase'
import Subscribe from '#models/subscribe'
import User from '#models/user'
import { increaseValidator } from '#validators/increase'
import type { HttpContext } from '@adonisjs/core/http'

export default class IncreasesController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    const increases = await Increase.query().orderBy('createdAt', 'desc').preload('subscribe').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(increases)
  }


  /**
   * Handle form submission for the create action
   */
  async store({ request, response ,auth}: HttpContext) {

    const playload = await request.validateUsing(increaseValidator)

    const subscribe = await Subscribe.find(playload.subscribeId)

    const user = await User.findOrFail(auth.user!.id)

    if (!subscribe) {
      return response.status(404).send({
        message: 'subscribe not found'
      })
    }

    const increase = await Increase.create({

      amount: playload.amount,
    })

    await increase.related('subscribe').associate(subscribe)

    await increase.related('created').associate(user)

    return response.status(200).send({message: 'increase created successfully'})


  }

  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {

    const increase = await Increase.find(params.id)

    if (!increase) {
      return response.status(404).send({
        message: 'increase not found'
      })
    }
    await increase.load('subscribe')

    await increase.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await increase.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })
    return response.status(200).send(increase)
  }


  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response,auth }: HttpContext) {

  const playload = await request.validateUsing(increaseValidator)

  const increase = await Increase.find(params.id)

  if (!increase) {
    return response.status(404).send({
      message: 'increase not found'
    })
  }

  const subscribe = await Subscribe.find(playload.subscribeId)

  if (!subscribe) {
    return response.status(404).send({
      message: 'subscribe not found'
    })
  }

  increase.amount = playload.amount
  increase.updatedBy = auth.user!.id

  await increase.save()

  await increase.related('subscribe').dissociate()

  await increase.related('subscribe').associate(subscribe)

  return response.status(200).send({message: 'increase updated successfully'}

  )
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {

    const increase = await Increase.find(params.id)

    if (!increase) {
      return response.status(404).send({
        message: 'increase not found'
      })
    }

    await increase.delete()

    return response.status(200).send({message: 'increase deleted successfully'})

    }
}
