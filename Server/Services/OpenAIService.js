const OpenAI = require('openai');

class OpenAIService {
    constructor(apikey) {
        this.apiKey = apikey;
        this.openAI = new OpenAI({ apiKey: this.apiKey });
    }

    async getChatCompletion(tone, body) {
        try {
            const systemMessage = 'You are an email tone analyzer. You will be provided with a required tone and email body and you should analyze the body against the required tone and rephrase the email body to better match the required tone while keeping the same context. Provide output in JSON format as follows: {"email_body":"the generated email body in html format"}';
            const prompt = `Analyze this email body '''${body}''' and suggest email body that is better aligned with ${tone} tone.`;
            const response = await this.openAI.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: systemMessage }, { role: 'user', content: prompt }],
                temperature: 0.7,
            });
            return response.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error calling OpenAI Chat Completions API:', error);
            throw error;
        }
    }
}
module.exports = OpenAIService;
