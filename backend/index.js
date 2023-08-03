const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 1000;

app.use(express.json());
app.use(require("cors")());
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.get('/',(req,res)=>{
  res.json("welcome")
})
app.post("/getShayari/:id", async (req, res) => {
  const input = req.params.id
  console.log(input);
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a helpful assistant that makes poems.` },
        { role: "user", content: `Write a Shayari about ${input} in a short paragraph`},
        { role: "assistant", content: "" }, // Add the assistant message with an empty content
      ],
    });

    const Shayari = response.data.choices[0].message.content.trim();
    console.log(Shayari);
    res.json({ Shayari });
  } catch (error) {
    console.error("Error generating Shayari:", error);
    res.status(500).json({ error: "An error occurred while generating the Shayari." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});