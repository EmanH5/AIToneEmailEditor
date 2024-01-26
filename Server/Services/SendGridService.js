const sgMail = require('@sendgrid/mail');

class SendGridService {
    constructor(apiKey) {
        sgMail.setApiKey(apiKey);
    }

    async sendEmail(fromEmail, toEmail, subjectEmail, emailBody) {
        const msg = {
            to: toEmail,
            from: fromEmail,
            subject: subjectEmail,
            html: emailBody,
        };

        
        sgMail.send(msg).then((response) => {
            console.log('Email sent')
            return response;
          })
          .catch((error) => {
            throw new Error(`Failed to send email: ${error.message}`);
          })
    }
}

module.exports = SendGridService;
