// server/index.js

const express = require("express");
require('dotenv').config()
const cors = require("cors"); // Import the cors middleware
const SendGridService = require("./Services/SendGridService");
const OpenAIService = require("./Services/OpenAIService");
const bodyParser = require('body-parser');

// server/index.js

const PORT = process.env.PORT || 3001;

const app = express();
// Enable CORS
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from node server!" });
  });

  const sendgridapiKey = process.env.SENDGRID_API_KEY;
  app.post('/send-email', async (req, res) => {
    const { fromEmail, toEmail, emailSubject, emailBody } = req.body;
    const sendGridService = new SendGridService(sendgridapiKey);
    try {
      const response = await sendGridService.sendEmail(fromEmail, toEmail, emailSubject, emailBody);
      res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const openaiapiKey = process.env.OPENAI_API_KEY;
  app.post('/check-tone', async (req, res) => {
    const {tone, value} = req.body;
    const openaiService = new OpenAIService(openaiapiKey);

      try {
          const response = await openaiService.getChatCompletion(tone, value);
          res.status(200).json({ message: 'Text generated successfully', response });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});