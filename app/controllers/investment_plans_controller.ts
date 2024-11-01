import InvestmentPlan from '#models/investment_plan'
import User from '#models/user'
import Vehicle from '#models/vehicle'
import { investmentPlanValidator, updateInvestmentPlanValidator } from '#validators/investment_plan'
import type { HttpContext } from '@adonisjs/core/http'


export default class InvestmentPlansController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {


     const investment_plans = await InvestmentPlan.query().orderBy('createdAt', 'desc').preload('vehicle').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

  
    return response.status(200).send(investment_plans)

  }


  /**
   * Handle form submission for the create action
   */
  async store({ request ,response,auth }: HttpContext) {

    const playload = await request.validateUsing(investmentPlanValidator)

    const vehicle = await Vehicle.find(playload.vehicleId)

    const user = await User.findOrFail(auth.user!.id)

    if (!vehicle) {
      return response.status(404).send({
        message: 'vehicle not found'
      })
    }

     const investment_plan = await InvestmentPlan.create({

      name:playload.name,
      amount:playload.amount,
      incomePercentage:playload.incomePercentage,
      durationInMonth:playload.durationInMonth,
      durationInDay:playload.durationInDay,
      minimumWithdrawalAmount:playload.minimumWithdrawalAmount

    })

    await investment_plan.related('vehicle').associate(vehicle)

    await investment_plan.related('created').associate(user)

    // await investment_plan.related('updated').associate(user!)

    return response.status(200).send({message: 'investment_plan created successfully'})

  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const investment_plan = await InvestmentPlan.find(params.id)

    if (!investment_plan) {
         return response.status(404).send({
        message: 'investment_plan not found'
      })
    }
     await investment_plan.load('vehicle')

    await investment_plan.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    await investment_plan.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(investment_plan)


  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response,auth}: HttpContext) {

    const playload = await request.validateUsing(updateInvestmentPlanValidator)

    const investment_plan = await InvestmentPlan.find(params.id)

    const user = await User.findOrFail(auth.user!.id)

    if (!investment_plan) {
      return  response.status(404).send({
        message: 'investment_plan not found'
      })
    }

     const vehicle = await Vehicle.find(playload.vehicleId)

    if (!vehicle) {
      return response.status(404).send({
        message: 'vehicle not found'
      })
    }

    investment_plan.name = playload.name
    investment_plan.amount = playload.amount
    investment_plan.incomePercentage = playload.incomePercentage
    investment_plan.durationInMonth = playload.durationInMonth
    investment_plan.durationInDay = playload.durationInDay
    investment_plan.minimumWithdrawalAmount = playload.minimumWithdrawalAmount
    investment_plan.updatedBy = user.id

     await investment_plan.save()

     await investment_plan.related('vehicle').dissociate()

    await investment_plan.related('vehicle').associate(vehicle)

    return {
      message: 'investment_plan updated successfully'
    }
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {

    const investment_plan = await InvestmentPlan.find(params.id)

    if (!investment_plan) {
      return response.status(404).send({
        message: 'investment_plan not found'})

    }

    await investment_plan.delete()

    return response.status(200).send({
      message: 'investment_plan deleted successfully',
    })
  }


}
