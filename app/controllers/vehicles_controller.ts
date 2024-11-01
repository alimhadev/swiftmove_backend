import User from '#models/user'
import Vehicle from '#models/vehicle'
import { vehicleValidator } from '#validators/vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {

    const vehicles = await Vehicle.query().orderBy('createdAt', 'desc').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(vehicles)
  }

  /**
   * @swagger
   * /api/v1/vehicles:
   *   post:
   *     summary: Create a new vehicle
   *     tags:
   *       - Vehicles
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the vehicle
   *                 example: SUV
   *     responses:
   *       200:
   *         description: Vehicle created successfully
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not found
   *
   */
  async store({ request, response,auth}: HttpContext) {

    const {name} = await request.validateUsing(vehicleValidator)

    const vehicle = await Vehicle.create({name:name})

    const  user = await User.findOrFail(auth.user!.id)

    await vehicle.related('created').associate(user)

    await vehicle.related('updated').associate(user)

    response.status(200).send({
      message: 'vehicle created successfully'})
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.status(404).send({
        message: 'vehicle not found'})
    }

      await vehicle.load('created',(query) =>{
        query.select('id','firstname','lastname')
      })

      await vehicle.load('updated',(query) =>{
        query.select('id','firstname','lastname')
      })

    return response.status(200).send(vehicle)
  }





  async update({ params, request, response ,auth}: HttpContext) {

    const vehicle = await Vehicle.find(params.id)
    if (!vehicle) {
      return response.status(404).send({
        message: 'vehicle not found'})
    }

    const {name} = await request.validateUsing(vehicleValidator)

    vehicle.name = name
    vehicle.updatedBy = auth.user!.id
    await vehicle.save()

    return response.status(200).send({
      message: 'vehicle updated successfully',
    })
  }

  /**
   * Delete record
   */
  async destroy({ params ,response}: HttpContext) {

    const vehicle = await Vehicle.find(params.id)
    if (!vehicle) {
      return response.status(404).send({
        message: 'vehicle not found'})
      }

    await vehicle.delete()

    return response.status(200).send({
      message: 'vehicle deleted successfully',
    })
  }


}
