

import scheduler from 'adonisjs-scheduler/services/main'



 scheduler.command("verify:activation").daily();

// scheduler.call(() => {
//     console.log("Pruge DB!");
// }).everyMinute();


scheduler.command("gain").everySeconds(5)

// scheduler.command("innactive:account")
