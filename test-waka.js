// require('dotenv').config();
// const { WakaTime } = require('wakatime');

// (async () => {
//   try {
//     console.log('Testing WakaTime API...');
//     const waka = new WakaTime(process.env.WAKATIMETOKEN);
//     const data = await waka.stats('last_7_days');
    
//     console.log('✅ Success!');
//     console.log('Total coding time:', data.data.human_readable_total);
//     console.log('Languages:', data.data.languages.map(l => l.name).join(', '));
//   } catch (error) {
//     console.error('❌ Failed:', error.message);
//   }
// })();