import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });

    res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "OpenAI error" });
  }
}
