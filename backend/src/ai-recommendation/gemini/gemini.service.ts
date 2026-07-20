import { GoogleGenAI } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger('GeminiService');
  private ai = new GoogleGenAI({});

  // Recibe texto plano, devuelve el vector matemático
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: text,
    });
    // @ts-ignore
    return response.embeddings![0].values;
  }

  async generateText(prompt: string): Promise<string> {
    this.logger.log(`Calling Gemini generateText with model gemini-2.0-flash`);
    const response = await this.ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });
    return response.text ?? '';
  }
}
