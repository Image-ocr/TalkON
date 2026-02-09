import OpenAI from 'openai';
import { createLogger } from '@talkon/shared';

const logger = createLogger('ai-service');

export class AIService {
  private static instance: AIService;
  private openai: OpenAI | null = null;

  private constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateSmartReply(messageContent: string): Promise<string[]> {
    if (!this.openai) {
      return ['Great!', 'Sure', 'Talk to you later'];
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates short, context-aware replies for a messaging app.',
          },
          {
            role: 'user',
            content: `Generate 3 short reply options for this message: "${messageContent}"`,
          },
        ],
        max_tokens: 50,
      });

      const content = response.choices[0]?.message?.content || '';
      return content.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    } catch (error) {
      logger.error('OpenAI Error', error as Error);
      return ['Okay', 'Got it', 'Thanks'];
    }
  }

  async transcribeAudio(audioUrl: string): Promise<string> {
    if (!this.openai) {
      return 'Transcription not available (API key missing)';
    }

    // In a real app, you would download the audio and send it to Whisper
    logger.info(`Transcribing audio from ${audioUrl}`);
    return 'This is a mock transcription of the audio message.';
  }

  async summarizeConversation(messages: string[]): Promise<string> {
    if (!this.openai) return 'Summary not available';

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Summarize the following conversation in a few sentences.' },
          { role: 'user', content: messages.join('\n') },
        ],
      });

      return response.choices[0]?.message?.content || 'No summary generated.';
    } catch (error) {
      logger.error('Summarization Error', error as Error);
      return 'Failed to generate summary.';
    }
  }
}
