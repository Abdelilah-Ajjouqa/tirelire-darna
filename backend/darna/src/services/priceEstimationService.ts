import { ChatOpenAI } from "@langchain/openai";
import { RealEstateInput } from "../models/real-estate";
import { HumanMessage } from "@langchain/core/messages";
import 'dotenv/config';


export class PriceEstimationService {
  private llm: ChatOpenAI;

  constructor() {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not set in environment variables");
    }


    this.llm = new ChatOpenAI({
      model: "openrouter/andromeda-alpha",
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL,
          "X-Title": process.env.OPENROUTER_SITE_NAME,
        },
      },
      temperature: 0.2,
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async estimatePrice(property: RealEstateInput) {
    const prompt = `
    You are an expert in real estate pricing.
    Estimate a realistic price range in MAD for the following property:

    ${JSON.stringify(property, null, 2)}

    Respond ONLY in JSON format like:
    { "min_price": number, "max_price": number, "currency": "MAD" }
    `;

    const response = await this.llm.invoke([new HumanMessage(prompt)]);

    try {
      return JSON.parse(response.content as string);
    } catch (error) {
      console.error("Error parsing AI response:", response.content);
      throw new Error("Failed to parse AI estimation");
    }
  }
}

