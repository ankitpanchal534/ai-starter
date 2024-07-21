import nodemailer from 'nodemailer';

const handler = (req, res) => {
    if (req.method === 'POST') {
        // Get the data from the request body
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });

        req.on('end', () => {
            try {
                // Parse the JSON data
                const { message, email, phoneNumber, name, offerAmount } = JSON.parse(data);
                // console.log('data', data)
                // Create a nodemailer transporter
                let transporter = nodemailer.createTransport({
                    // Configure your email provider here
                    service: 'gmail',
                    auth: {
                        user: 'apdudhla9837@gmail.com',
                        pass: '9837391864'
                    }
                });


                // Setup email data
                let mailOptions = {
                    from: 'apdudhla9837@gmail.com',
                    to: 'ankitpanchal534@gmail.com',
                    subject: 'Domain Enquire',
                    text: data
                };

                // Send email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.statusCode = 500;
                        res.end('Failed to send email');
                    } else {
                        console.log('Email sent:', info.response);
                        res.statusCode = 200;
                        res.end('Email sent successfully');
                    }
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.statusCode = 400;
                res.end('Invalid JSON data');
            }
        });
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
};

export default handler;
