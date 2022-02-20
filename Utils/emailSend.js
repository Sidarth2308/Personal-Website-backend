var nodemailer = require("nodemailer");

const nodeEmail = (name, email, subject, message) => {
  console.log(process.env.PASSWORD);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.SIDARTH_EMAIL,
    subject: `Website inquiry from ${name}`,
    html: `
        <div>
        <h3 style="font-weight: 500">
          Hey Sidarth,  I am <b>${name}</b> and here is my subject:<br/> <b>${subject}</b><br />
          <br />
          and here is my message:<br/>
          <b>${message}</b>
          <br />
          email : ${email}
        </h3>
      </div>`
    // html: `<h3>DSC User Info:</h3><br>
    //  <b>Name:</b> ${name} <br> <b>Email:</b>  ${email} <br>`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = nodeEmail;
