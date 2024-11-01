import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class InnactiveAccount extends BaseCommand {
  static commandName = 'innactive:account'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    // this.logger.info('Hello world from "InnactiveAccount"')

    const oneWeekAgo =new Date()

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const inactiveUsers = await User.query().where('solde', 0).andWhere('createdAt', '<', oneWeekAgo)

    await User.query().whereIn('id', inactiveUsers.map((user: { id: any }) => user.id)).delete()

    return { message: `${inactiveUsers.length} comptes inactifs fermés` }
  }
}
