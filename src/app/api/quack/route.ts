import get_chain from "@/quack/client";
import searchContext from "../../../utils";
import {
  black_hat,
  white_hat,
  green_hat,
  red_hat,
  yellow_hat,
  blue_hat,
  summary,
  plain_summary,
} from "@/quack/prompts";
import { NextResponse } from "next/server";

const getContext = async (hat: string) => {
  switch (hat) {
    case "blue":
      return await Promise.all(
        ["Who is Elon Musk?", "What elon musk does/did"].map(async (prompt) =>
          searchContext(prompt)
        )
      );
    case "yellow":
      return await Promise.all(
        ["Who is Bob Ross?", "What bob ross does/did"].map(async (prompt) =>
          searchContext(prompt)
        )
      );
    case "black":
      return await Promise.all(
        ["Who is Sherlock Holmes?", "What sherlock holmes does/did"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "white":
      return await Promise.all(
        ["Who is Bertrand Russell?", "What bertrand russell does/did"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "red":
      return await Promise.all(
        ["Who is Bobby McFerrin?", "What bobby mcferrin does/did"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "green":
      return await Promise.all(
        ["Who is Frida Kahlo?", "What frida kahlo does/did"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    default:
      throw new Error("Invalid hat");
  }
};

const getQuote = async (hat: string) => {
  switch (hat) {
    case "blue":
      return await Promise.all(
        ["Elon Musk Quotes", "Elon Musk famous quotes"].map(async (prompt) =>
          searchContext(prompt)
        )
      );
    case "yellow":
      return await Promise.all(
        ["Bob ross quotes", "Bob ross famous quotes"].map(async (prompt) =>
          searchContext(prompt)
        )
      );
    case "black":
      return await Promise.all(
        ["Sherlock Holmes quotes", "Sherlock holmes famous quotes"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "white":
      return await Promise.all(
        ["Berthrand Russel quotes", "Bertrand russell famous quotes"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "red":
      return await Promise.all(
        ["Bobby Mcferrin quotes", "Bobby mcferrin famous quotes"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    case "green":
      return await Promise.all(
        ["Frida Khalo quotes", "Frida kahlo famous quotes"].map(
          async (prompt) => searchContext(prompt)
        )
      );
    default:
      throw new Error("Invalid hat");
  }
};
const getContextSearch = async (hat: string) => {
  const context = await getContext(hat);
  return context
    .flat()
    .map((c) => c.body)
    .join("\n");
};

const getQuoteSearch = async (hat: string) => {
  const context = await getQuote(hat);
  return context
    .flat()
    .map((c) => c.quote)
    .join("\n");
};

export async function POST(req: Request) {
  const { message, hat } = await req.json();
  let chain;
  let data;
  const summary_chain = await get_chain(summary);
  const plain_summary_chain = await get_chain(plain_summary);
  switch (hat) {
    case "blue":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(blue_hat);
      break;
    case "yellow":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(yellow_hat);
      break;
    case "black":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(black_hat);
      break;
    case "white":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(white_hat);
      break;
    case "red":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(red_hat);
      break;
    case "green":
      data = {
        context: await getContextSearch(hat),
        quotes: await getQuoteSearch(hat),
        user_input: message,
      };
      chain = await get_chain(green_hat);
      break;
    default:
      throw new Error("Invalid hat");
  }
  const hat_result = await chain.call({
    context: data.context,
    quotes: data.quotes,
    user_input: data.user_input,
  });
  let result;
  try {
    result = await summary_chain.call({ input: hat_result.text });
    result = JSON.parse(result.text);
  } catch (e) {
    result = await plain_summary_chain.call({ input: hat_result.text });
    result = { introduction: result.text, bulletPoints: [] };
  }
  return NextResponse.json({ result, hat });
}
