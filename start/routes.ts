



/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const AuthController = () => import('#controllers/auth_controller')
const ResetPasswordsController = () => import('#controllers/reset_passwords_controller')
const AccountVerifsController = () => import('#controllers/account_verifs_controller')
const VehiclesController = () => import('#controllers/vehicles_controller')
const UsersController = () => import('#controllers/users_controller')
const InvestmentPlansController = () => import('#controllers/investment_plans_controller')
const SubscribesController = () => import('#controllers/subscribes_controller')
const IncreasesController = () => import('#controllers/increases_controller')
const ReactivationsController = () => import('#controllers/reactivations_controller')
const DepositsController = () => import('#controllers/deposits_controller')
const WithdrawalsController = () => import('#controllers/withdrawals_controller')


import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
// import AutoSwagger from "adonis-autoswagger";
// import swagger from "#config/swagger";

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// router.get('/docs', async ({ view }) => {
// 	const specUrl = '/swagger.json'
// 	return view.render('swagger', { specUrl })
// })

// // returns swagger in YAML
// router.get("/swagger", async () => {
//   return AutoSwagger.default.docs(router.toJSON(), swagger);
// });

// // returns swagger in JSON
// router.get("/doc2", async () => {
//    return AutoSwagger.default.ui("/swagger", swagger);
// });

// // Renders Swagger-UI and passes YAML-output of /swagger
// router.get("/docs", async () => {
//   // return AutoSwagger.default.ui("/swagger", swagger);
//   return AutoSwagger.default.scalar("/swagger"); // to use Scalar instead
//   // return AutoSwagger.default.rapidoc("/swagger", "view"); //to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
// });


router.group(() => {

  router.post('/login', [AuthController, 'login'])
  router.post('/register', [AuthController, 'register'])
  router.get('/deposit-file/:filename', [DepositsController, 'getFile'])

  router.post('/forgot-password', [ResetPasswordsController, 'handleForgotPassword'])
  router.post('/reset-password', [ResetPasswordsController, 'handleResetPassword'])
  router.post('/verification-by-email', [AccountVerifsController, 'verificationByMail'])
  router.post('/resend-verification-email', [AccountVerifsController, 'resendVerificationEmail'])
  router.get('/verify-token', [AccountVerifsController, 'verifyToken'])

  // Only admin routes
  router.group(() => {
    router.resource('vehicles', VehiclesController).apiOnly()

    router.resource('users', UsersController).apiOnly().use('*', middleware.auth())
    router.get('/close-inactive-account', [UsersController, 'closeInactiveAccount'])
    router.put('/investment_plans/:id', [InvestmentPlansController, 'update'])
    router.delete('/investment_plans/:id', [InvestmentPlansController, 'destroy'])
    router.post('/investment_plans', [InvestmentPlansController, 'store'])
    router.post('/validate-deposit/:id', [DepositsController, 'validateDeposit'])
    
    router.get('/withdrawals-request-list', [WithdrawalsController, 'withdrawalsRequestList'])
    router.get('/deposits-request-list', [DepositsController, 'depositRequestList'])
    router.post('/validate-withdrawal/:id', [WithdrawalsController, 'validateWithdrawal'])
    router.get('/users-list', [UsersController, 'index'])
    router.get('/withdrawals-by-user', [WithdrawalsController, 'withdrawalByUser'])
    router.resource('withdrawals', WithdrawalsController).apiOnly()
    router.resource('deposits', DepositsController).apiOnly()

  }).use([middleware.auth(), middleware.OnlyAdminRole()])

  // Only super admin routes

  router.group(() => {

    router.get('/admins-list', [UsersController, 'adminList'])

    router.post('/set-admin/:id', [UsersController, 'setAdmin'])

  }).use([middleware.auth(), middleware.superAdminRole()])

  // Only user routes

  router.group(() => {
    // No using this yet
    router.get('reactivations-list-by-user', [ReactivationsController, 'reactivationListByUser'])

    router.get('/current-user', [AuthController, 'currentUser'])

    router.get('/investment_plans', [InvestmentPlansController, 'index'])
    router.post('/logout', [AuthController, 'logout'])
  }).use(middleware.auth())

  router.group(() => {
    router.get('/deposits-by-user', [DepositsController, 'depositByUser'])
    router.post('/withdrawal-for-user', [WithdrawalsController, 'withDrawalsForUser'])
    router.post('/reactivation-for-user', [ReactivationsController, 'store'])
    router.get('/user-subscribtion-plans', [SubscribesController, 'UserSubscribtion'])
    router.get('/user-increases', [SubscribesController, 'userIncrease'])
    router.post('/deposit-for-user', [DepositsController, 'depositForUser'])

    // router.resource('subscribes', SubscribesController).apiOnly()

    router.post('/subscribtion-for-user', [SubscribesController, 'subscribtionForUser'])

    router.get('/total-investment', [SubscribesController, 'totalInvestment'])

    router.resource('increases', IncreasesController).only(['index', 'destroy'])

    router.resource('reactivations', ReactivationsController).apiOnly()

    // router.get('/deposit-file/:filename', [DepositsController, 'getFile'])

    

    

  }).use([middleware.auth(), middleware.OnlyUserRole()])

}).prefix('/api/v1')
