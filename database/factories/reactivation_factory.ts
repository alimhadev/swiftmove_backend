import factory from '@adonisjs/lucid/factories'
import Reactivation from '#models/reactivation'
import { DateTime } from 'luxon'

export const ReactivationFactory = factory
  .define(Reactivation, async ({ faker }) => {
    return {
      createdAt:DateTime.fromJSDate(faker.date.between({ from: '2024-06-01T00:00:00.000Z', to: '2024-12-01T00:00:00.000Z' }))
    }
  })
  .build()
