import vine from '@vinejs/vine'


export const increaseValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    subscribeId: vine.number()
  })
)
