const polynomials = require('./polynomials');
const mailer = require('./mailer');
var API = "2KE3YV-L8L7EQ62RE";
global.lol = ""

var lower = ""
var upper = ""
var lol = polynomials("min value", "x to the fourth power", lower, upper, function(arg, str) {
    // console.log(arg);
    global.lol += arg
    console.log(global.lol);
})

// console.log(global.lol);
mailer("LOL")
// var w = require('wolfram-node').init(API);
//
// var data = {
//     query: 'Domain of 1/x'
// }
//
// w.ask(data, function(err, result) {
//     if (err){
//         throw err;
//     }
//     // console.log(result.pod);
//     console.log(result.pod[0].subpod[0].plaintext[0]);
//     console.log(result.pod[1].subpod[0].plaintext[0]);
// })
