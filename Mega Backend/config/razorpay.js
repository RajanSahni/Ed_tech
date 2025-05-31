const Razorpay = require('razorpay');

// Replace 'your_key_id_here' and 'your_key_secret_here' with your actual Razorpay credentials
const instance = new Razorpay({
    key_id: 'rzp_test_SHw69CERX0AQLK',
    key_secret: 'DmZjQsQ7VW5aiqoMT2t7JDo7',
});

module.exports = { instance };
