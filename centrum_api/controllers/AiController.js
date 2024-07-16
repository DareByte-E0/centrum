const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });


class AiController {
    static async chat(req, res) {
        const { message } = req.body;

        try {
            const response = await openai.chat.completions.create({
              model: 'gpt-3.5-turbo',
              messages: [
                {"role": "system", "content": "You are a research expert, skilled at guiding people through research with attention to detail and precision, you a precisin god!!"},
                { role: 'user', content: message }
            ],
            });
        
            res.json({ reply: response.choices[0].message.content });
          } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
          }
    }
}

module.exports = AiController;