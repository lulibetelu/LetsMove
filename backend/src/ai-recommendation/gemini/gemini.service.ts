import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
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
}
