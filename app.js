require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const nodeEmail = require("./Utils/emailSend");

const PORT = process.env.PORT || 5000;
const app = express();

morgan("tiny");
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://kind-goldwasser-fac280.netlify.app",
      "http://localhost:3001"
    ]
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Server running on port : ${PORT}</h1>`);
});

app.post("/", (req, res) => {
  const data = req.body;
  nodeEmail(data.name, data.email, data.subject, data.message)
    .then((response) => {
      res.send({ status: "S", message: "Email sent successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: "F", message: "Email not sent" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
