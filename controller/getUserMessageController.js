import dotenv from 'dotenv'
dotenv.config();
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


const getUserMessageController = (req, res, next) => {
    const { userName, userEmail, userMessage } = req.body;

    const config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Sanajani Profile",
            link: "https://github.com/sanajani"
        }
    })

    let response = {
        body: {
            name: userName,
            intro: userEmail,
            outro: userMessage,
            signature: false,
            greeting: false
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: userEmail,
        to: EMAIL,
        subject: "Sanajani profile review",
        html: mail
    }
    
    transporter.sendMail(message).then(() => {
        sentReciveEmail(userName,userEmail)
        return res.status(201).json({
            message: "I recived your email thanks"
        })
    }).catch((error) => {
        return res.status(500).json({
            message: error
        })
    })
}

const sentReciveEmail = (userName,userEmail) => {
    const config = {
        service: "gmail",
        auth:{
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    const Mailgenerator = new Mailgen({
        theme: "default",
        product:{
            name:"Sanajani Profile",
            link:"https://github.com/sanajani"
        }
    })

    let response = {
        body:{
            name: userName,
            intro: "Email from Sanajani",
            outro: `Hello dear ${userName} I recived your Email I will be in contact with you very soon`,
            
        }
    }
    let mail = Mailgenerator.generate(response);

    let message = {
        from: "webdevfarsi@gmail.com",
        to: userEmail,
        subject: "Sanajani Recived your Email",
        html: mail
    }

    transporter.sendMail(message)
}


export { getUserMessageController }