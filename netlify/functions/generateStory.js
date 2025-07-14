import { Configuration, OpenAIApi } from "openai";
console.log("Loaded API Key:", process.env.OPENAI_API_KEY ? "✅ found" : "❌ missing");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Allow": "POST" },
      body: "Method Not Allowed",
    };
  }

  try {
    const { childName, theme } = JSON.parse(event.body);

    if (!childName || !theme) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing childName or theme" }),
      };
    }

    const prompt = `
You are a world-class children's book author writing an emotional, imaginative bedtime story.

Create a story with the child named "${childName}" as the main character.

The story explores the theme "${theme}" and includes an ethical question about compassion for animals.

Write in poetic language, with short paragraphs and page breaks.

End with: "The End. Sleep well, ${childName}." followed by a gentle reflection question for parents.
`;

  const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.7,
  max_tokens: 700,
});


    const story = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ story }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}

