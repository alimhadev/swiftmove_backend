import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    User.create({
      firstname:"John",
      lastname:"Doe",
      email:"Johndoe@mail.com",
      password:"password",
      isAdmin:true,
      isVerified:true,
      isSuperAdmin:true
    })
  }
}
