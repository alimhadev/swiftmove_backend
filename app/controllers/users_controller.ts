import User from '#models/user'
import { registerValidation, updateValidation } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'


export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {

    const users = await User.query().where('isAdmin',false).andWhere('isSuperAdmin',false).orderBy('createdAt', 'desc').preload('created',(query) =>{
      query.select('id','firstname','lastname')
    }).preload('updated',(query) =>{
      query.select('id','firstname','lastname')
    })




    return response.status(200).send(users)

  }


  async store({ request, response,auth }: HttpContext) {

    const {firstname, lastname, email, password} = await request.validateUsing(registerValidation)

    const user = await User.findOrFail(auth.user!.id)

   await User.create({
      firstname:firstname,
      lastname:lastname,
      email:email.toLowerCase(),
      password:password,
      // avatar:avatar,



    })

    await user.related('created').associate(user)

    return response.status(200).send({message: 'user created successfully'})


  }


  async closeInactiveAccount() {

    const oneWeekAgo =new Date()

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const inactiveUsers = await User.query().where('solde', 0).andWhere('createdAt', '<', oneWeekAgo)

    await User.query().whereIn('id', inactiveUsers.map((user: { id: any }) => user.id)).delete()

    return { message: `${inactiveUsers.length} comptes inactifs fermés` }
  }
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'})
    }
     user.load('created',(query) =>{
      query.select('id','firstname','lastname')
    })

    user.load('updated',(query) =>{
      query.select('id','firstname','lastname')
    })

    return response.status(200).send(user)
  }


  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response,auth }: HttpContext) {

    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'})
    }

    const {firstname, lastname, email, password} = await request.validateUsing(updateValidation)

    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.password = password
    // user.avatar = avatar


    user.updatedBy = auth.user!.id

    await user.save()

    return response.status(200).send({message: 'user updated successfully'})
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {

    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'})
    }

    await user.delete()

    return response.status(200).send({
      message: 'user deleted successfully',
    })
  }

  async setAdmin({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).send({
        message: 'user not found'})
    }

    if (user.isAdmin === false) {
      user.isAdmin = true
    } else {
      user.isAdmin = false
    }

    await user.save()

    return response.status(200).send({
      message: 'user updated successfully',
    })

    }



      async adminList({ response }: HttpContext) {

        const users = await User.query().where('isAdmin',true).orderBy('createdAt', 'desc').preload('created',(query) =>{
          query.select('id','firstname','lastname')
        }).preload('updated',(query) =>{
          query.select('id','firstname','lastname')
        })

        return response.status(200).send(users)

      }




}
