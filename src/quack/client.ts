"use server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import * as dotenv from "dotenv";
import { LLMChain } from "langchain/chains";
import { BasePromptTemplate } from "langchain/prompts";
dotenv.config();
const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
export default async function get_chain(
  prompt: BasePromptTemplate
): Promise<LLMChain> {
  return new LLMChain({ llm: chat, prompt });
}
