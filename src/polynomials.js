/* eslint-disable  func-names */
// /* eslint quote-props: ["error", "consistent"]*/
module.exports = {
    POLYNOMIAL_EN_US: {
        'derivative of x squared': 'The derivative of x squared is two x.',
        'integral of two x': 'The indefinite integral of two x is x squared plus c.',
        'x squared plus two x': 'x squared plus two x is x squared plus two x,',
        'two x minus five': 'two x minus five is two x minus five,',
        'min value of x squared': 'the minimum value of x squared is zero and occurs when x equals zero.',
        //'five plus five': 'five plus five is ten.'
    }
};

module.exports = (operation, equation) => {
    var exec = require('child_process').execSync;
    var cmd = 'python wolfram.py ' + operation + " " + equation;

    // console.log(operation);
    // console.log(equation);
    // myans = ""
    var lol = exec(cmd, function(error, stdout, stderr) {
        // command output is in stdout
        if (stderr) {
            console.log(stderr);
        }
        // console.log(stdout);
        return stdout

    });
    // const buf1 = Buffer.allocUnsafe(lol.length)
    // console.log(buf1.toString(lol));
    // console.log(lol.toString());
    return lol.toString();
    // console.log("hello");
    // console.log(myans);
    // return {
    // return myans
    //     lol: () => "hello"
    // }
    // console.log("hello");
}
