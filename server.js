const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

const upload = multer();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// changes made 👍

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


app.post("/send", upload.single("file"), async (req, res) => {
    const { dob, message } = req.body;


    if (!dob || !message) {
        return res.status(400).send("All fields are required.");
    }


    if (dob !== "04052000") {
        return res.status(403).send("Invalid DOB! Access Denied.");
    }


    const file = req.file;

    const mailOptions = {
        from: process.env.EMAIL,
        to: "marisettichinna28@gmail.com", // Replace with your recipient email
        subject: "New Message from Mariya's Space",
        text: `DOB: ${dob}\nMessage: ${message}`,
        ...(file && {
            attachments: [
                {
                    filename: file.originalname,
                    content: file.buffer,
                },
            ],
        }),
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
