
import vine from '@vinejs/vine'

 export const investmentPlanValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    amount: vine.number().min(0),
    incomePercentage: vine.number().min(0).max(100),
    durationInMonth: vine.number().min(0),
    durationInDay: vine.number().min(0),
    minimumWithdrawalAmount: vine.number().min(0),
    vehicleId: vine.number()
  })
)

export const updateInvestmentPlanValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    amount: vine.number().min(0),
    incomePercentage: vine.number().min(0).max(100),
    durationInMonth: vine.number().min(0),
    durationInDay: vine.number().min(0),
    minimumWithdrawalAmount: vine.number().min(0),
    vehicleId: vine.number()
  })
)
