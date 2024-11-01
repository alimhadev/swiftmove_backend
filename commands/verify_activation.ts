import Subscribe from '#models/subscribe'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

export default class VerifyActivation extends BaseCommand {
  static commandName = 'verify:activation'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    // this.logger.info('Hello world from "VerifyActivation"')
    try {
      const now =  DateTime.now()
      const oneWeekAgo =  now.minus({ days:30 })

      // inactive subscriptions

      const inactiveSubscriptions = await Subscribe.query().where('state', 'active').andWhere('lastActivity', '<', oneWeekAgo.toJSDate())

      for (const subscribe of inactiveSubscriptions) {

        subscribe.state = 'inactive'

        await subscribe.save()
      }

    } catch (error) {

       throw error
    }
  }
}
