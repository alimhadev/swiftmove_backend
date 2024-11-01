

import scheduler from 'adonisjs-scheduler/services/main'



 scheduler.command("verify:activation").daily();

// scheduler.call(() => {
//     console.log("Pruge DB!");
// }).everyMinute();


scheduler.command("gain").daily()
