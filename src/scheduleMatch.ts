import cron from 'node-cron';

export default function scheduleMatch (): void {
  cron.schedule('* * * * * *', () => {
    console.log('Running a task every minute  ');
    // Your matching algorithm here
  });
}
