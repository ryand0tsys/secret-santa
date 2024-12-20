const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/send", async (req, res) => {
    const { dob, message } = req.body;

    if (!dob || !message) {
        return res.status(400).send("All fields are required.");
    }

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL, // Replace with your recipient email
        subject: "New Message from Secret Santa",
        text: `DOB: ${dob}\nMessage: ${message}`,
    };

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Something went wrong. Please try again.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
