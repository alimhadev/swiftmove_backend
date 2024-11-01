import vine from '@vinejs/vine'



export const reactivationValidator = vine.compile(
  vine.object({
    subscribeId: vine.number()
  })
)
