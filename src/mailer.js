API = "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"
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

module.exports = (out) => {
    var helper = require('sendgrid').mail
    from_email = new helper.Email("stma6942@colorado.com")
    to_email = new helper.Email("rylo5688@colorado.edu")
    subject = "Here is what you still need to learn in Calculus"
    console.log(out.toString());
    content = new helper.Content("text/html", out)
    mail = new helper.Mail(from_email, subject, to_email, content)
    var sg = require('sendgrid')(API);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function(error, response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
    })
}
