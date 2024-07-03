const nodemailer = require('nodemailer');

// Function to send email
exports.sendEmail = async (req, res) => {
    const { de, para, texto } = req.body;

    // Call the mandarCorreo() function with provided email data
    await mandarCorreo(de, para, texto);

    // Send response to client
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
};

// Function to send email using nodemailer
async function mandarCorreo(de, para, texto) {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'lacey.brakus25@ethereal.email',
                pass: 'WXxaNsMAcBzmJPVmwY'
            }
        });

        // Message object
        let message = {
            from: `Sender Name <${de}>`,
            to: `Recipient <${para}>`,
            subject: 'Feria Virtual - Registro de cuenta',
            text: texto,
            html: `<h1>${texto}</h1>`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}
