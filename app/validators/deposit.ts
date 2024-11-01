
import vine from '@vinejs/vine'

export const depositValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    method: vine.string().trim().minLength(3),
    userId: vine.number(),
    isValitated: vine.boolean(),
    photo:vine.file({
      extnames: ['jpg', 'png', 'jpeg'],
      size: '10mb'
    })
  })
)

export const depositByUserValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    method: vine.string().trim().minLength(3),
   
    isValitated: vine.boolean(),
    photo:vine.file({
      extnames: ['jpg', 'png', 'jpeg'],
      size: '10mb'
    })
  })
)
