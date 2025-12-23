// // quick-test.js
// require('dotenv').config();
// const axios = require('axios');

// (async () => {
//   console.log('Testing token:', process.env.WAKATIMETOKEN);
  
//   try {
//     const response = await axios.get(
//       'https://wakatime.com/api/v1/users/current',
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WAKATIMETOKEN}`,
//         },
//       }
//     );
    
//     console.log('✅ Token is VALID!');
//     console.log('User:', response.data.data.display_name);
//     console.log('Email:', response.data.data.email);
//   } catch (error) {
//     console.error('❌ Token is INVALID');
//     console.error('Error:', error.response?.data || error.message);
//   }
// })();