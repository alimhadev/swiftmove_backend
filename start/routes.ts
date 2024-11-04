



/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const AuthController= () =>import('#controllers/auth_controller')
const ResetPasswordsController= () =>import('#controllers/reset_passwords_controller')
const AccountVerifsController= () =>import('#controllers/account_verifs_controller')
const VehiclesController= () =>import('#controllers/vehicles_controller')
const UsersController= () =>import('#controllers/users_controller')
const InvestmentPlansController= () =>import('#controllers/investment_plans_controller')
const SubscribesController= () =>import('#controllers/subscribes_controller')
const IncreasesController= () =>import('#controllers/increases_controller')
const ReactivationsController= () =>import('#controllers/reactivations_controller')
const DepositsController= () =>import('#controllers/deposits_controller')
const WithdrawalsController= () =>import('#controllers/withdrawals_controller')


import router from '@adonisjs/core/services/router'
import { middleware} from './kernel.js'
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
  router.post('/logout', [AuthController, 'logout'])
  router.post('/forgot-password', [ResetPasswordsController, 'handleForgotPassword'])
  router.post('/reset-password', [ResetPasswordsController, 'handleResetPassword'])
  router.post('/verification-by-email', [AccountVerifsController, 'verificationByMail'])
  router.get('/verify-token', [AccountVerifsController, 'verifyToken'])




  router.group(() => {

    router.resource('vehicles', VehiclesController).apiOnly()

    router.resource('users', UsersController).apiOnly().use('*', middleware.auth())

    router.get('/close-inactive-account', [UsersController, 'closeInactiveAccount'])

    router.post('/investment_plans', [InvestmentPlansController, 'store'])

    router.put('/investment_plans/:id', [InvestmentPlansController, 'update'])

    router.delete('/investment_plans/:id', [InvestmentPlansController, 'destroy'])



//
    router.resource('subscribes', SubscribesController).apiOnly()

    router.post('/subscribtion-for-user', [SubscribesController, 'subscribtionForUser'])

    router.get('/total-investment', [SubscribesController, 'totalInvestment'])

//
    router.resource('increases', IncreasesController).only(['index', 'destroy'])


//
    router.resource('reactivations', ReactivationsController).apiOnly()

//

    router.resource('deposits', DepositsController).apiOnly()

    router.get('/deposits-request-list', [DepositsController, 'depositRequestList'])

    router.post('/validate-deposit/:id', [DepositsController, 'validateDeposit'])

    router.get('/deposit-file/:filename', [DepositsController, 'getFile'])



//
    router.resource('withdrawals', WithdrawalsController).apiOnly()



    router.get('/withdrawals-request-list', [WithdrawalsController, 'withdrawalsRequestList'])



    router.post('/validate-withdrawal/:id', [WithdrawalsController, 'validateWithdrawal'])


  }).use([middleware.auth(), middleware.userRole()])











  router.group(() => {

    router.post('/deposit-for-user', [DepositsController, 'depositForUser'])

    router.get('/deposits-by-user', [DepositsController, 'depositByUser'])

    router.post('/withdrawal-for-user',[WithdrawalsController,'withDrawalsForUser'])

    router.get('/withdrawals-by-user', [WithdrawalsController, 'withdrawalByUser'])

    router.get('reactivations-list-by-user', [ReactivationsController, 'reactivationListByUser'])

    router.post('/reactivation-for-user', [ReactivationsController, 'store'])

    router.get('/current-user', [AuthController, 'currentUser'])

    router.get('/investment_plans', [InvestmentPlansController, 'index'])

    router.get('/user-subscribtion-plans', [SubscribesController, 'UserSubscribtion'])

    router.get('/user-increases', [SubscribesController, 'userIncrease'])


  }).use(middleware.auth())

}).prefix('/api/v1')
