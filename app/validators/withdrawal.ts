import vine from '@vinejs/vine'

export const withdrawalValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    method: vine.string().trim().minLength(3),
    cost: vine.number().min(0),
    isValitated: vine.boolean(),
    userId: vine.number(),
    phoneNumber: vine.string().trim().minLength(8).maxLength(15).mobile(),
  })
)

export const withdrawalByUserValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    method: vine.string().trim().minLength(3),
    phoneNumber: vine.string().trim().minLength(8).maxLength(15).mobile(),
  })
)

