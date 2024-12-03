import Increase from '#models/increase';
import  Subscribe  from '#models/subscribe';
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon';

export default class Gain extends BaseCommand {
  static commandName = 'gain'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    try {

      console.log(" je reçois le gain")
      // subscriptions

      const subscrition = await Subscribe.query().where('state', 'active').andWhere('lastActivity', '<', DateTime.now().minus({ days: 30 }).toJSDate()).preload('user').preload('investmentPlan')


      // users

      for (const subscribe of subscrition) {

        const percentageByDay = subscribe.investmentPlan.incomePercentage / subscribe.investmentPlan.durationInDay



        const gainAmount = Number(subscribe.investmentPlan.amount) * percentageByDay


        subscribe.fakeMonths-=1

        const numMonths = 30

        if(subscribe.leftDays!=0){

          if(!((numMonths - subscribe.fakeMonths)%7 == 0)){

            subscribe.leftDays -=1

            subscribe.user.solde += Number(gainAmount)

            const increase = await Increase.create({ amount: gainAmount })

            await increase.related('subscribe').associate(subscribe)


          await subscribe.user.save()

          }
        }else{

          subscribe.state = 'ended'

          await subscribe.save()
        }

      }

    } catch (error) {

      throw error
    }

  }
}
