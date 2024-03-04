const express = require("express");
const bodyParser = require("body-parser");
const OpenAIApi = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.post("/items", async (req, res) => {
  const prompt = req.body.value;
  const response = await callChatGPT(prompt);
  const data = JSON.parse(response);

  if (response) {
    res.json(data);
  } else {
    res.status(500).json({ error: "Failed to get response from ChatGPT API" });
  }
  async function callChatGPT(prompt) {
    try {
      const openai = new OpenAIApi({
        apiKey: process.env.OPEN_AI_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "너는 모든 내용들을 객관식 문제로 만들어주는 문제집이야, 앞으로 사용자가 긴 내용들을 입력하면 너는 객관식으로 문제를 내줘야해",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "quiz",
              description:
                "공부한 내용으로 객관식 문제를 알려줌 (예: 대한민국의 수도는 어디인가요?\n1. 서울\n2. 부산\n3. 대구\n4. 인천.)",
              parameters: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    description:
                      "객관식 문제로 알려줘야하며, 한국어로 출력해야한다 (예: 대한민국의 수도는 어디인가요?)",
                  },
                  options: {
                    type: "string",
                    description:
                      "문제의 보기를 보여줘야한다, 한국어로 출력해야한다 (예: \n1. 서울\n2. 부산\n3. 대구\n4. 인천.)",
                  },
                  answer: {
                    type: "number",
                    description: "각 문제의 정답 번호를 알려주세요. (예: 1, 2, 3)",
                  },
                },
                required: ["quiz", "options", "answer"],
              },
            },
          },
        ],
        temperature: 1,
        // 토큰의 수가 너무 길어 질 경우 불안정한 대답이 올라온다
        max_tokens: 3000,
      });

      return response.choices[0].message.tool_calls[0].function.arguments;
    } catch (error) {
      console.error("Error calling ChatGPT API:", error);
      return null;
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
