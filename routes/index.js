const nodemailer = require('nodemailer');

exports.sendEmail = function(req, res) {

  const mailOpts, smtpConfig;

  smtpConfig = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: req.body.email, 
      pass: req.body.password
    }
  });

  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: req.body.receiver,
    subject: req.body.subject,
    text: req.body.message
  };

  smtpConfig.sendMail(mailOpts, function(error, response) {

    if (error) {
      res.end("Email send Falied" + error);
    }

    else {
      res.redirect("/?Email send sucessfully");
    }
  });
};
