var API = "2KE3YV-L8L7EQ62RE"
var wolfram = require('wolfram-alpha').createClient(API);


var param = "Derivative of 2x"
wolfram.query(param, function (err, result) {
    if (err) throw err;
    console.log(param + " is " + result[0].subpods[0].text.split("=")[1]);
});
