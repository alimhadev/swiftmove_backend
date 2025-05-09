import vine from '@vinejs/vine'

// validation for register
export const registerValidation = vine.compile(
  vine.object({

    firstname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    lastname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    email: vine.string().toLowerCase().trim().email().unique(async (db,value)=>{
      const user = await db.from('users').where('email',value).first()
      return !user
    }),
    password: vine.string()
    .minLength(8)
    .maxLength(35),

    // avatar: vine.file({
    //   extnames: ['jpg', 'png', 'jpeg'],
    //   size: '5mb'
    // })
    // .optional(),




    isVerified: vine.boolean().optional(),



  })
)

// validation for login
export const loginValidation = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string()
    .minLength(8)
    .maxLength(35),
  })
)

export const updateValidation = vine.compile(
  vine.object({
    firstname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    lastname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    email: vine.string().trim().email().unique(async (db,value,field)=>{
      const user = await db.from('users').whereNot('id',field.data.params.id).where('email',value).first()
      return !user
    }),
    password: vine.string()
    .minLength(8)
    .maxLength(35),
    // avatar: vine.file({
    //   extnames: ['jpg', 'png', 'jpeg'],
    //   size: '5mb'
    // })
    // .optional(),



  })
)
