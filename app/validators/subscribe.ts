import vine from '@vinejs/vine'


export const subscribeValidator = vine.compile(
  vine.object({
  state: vine.string().trim().in(['active','inactive','ended']),
  userId: vine.number(),
  investmentPlanId: vine.number()
  })
)

export const subscribeByUserValidator = vine.compile(
  vine.object({
  investmentPlanId: vine.number()
  })
)
