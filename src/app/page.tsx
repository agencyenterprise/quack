"use client";
import { useState } from "react";
import Switch from "./components/Switch";

export default function Home() {
  const [quackSound] = useState(
    typeof Audio !== "undefined" && new Audio("/quack.mp3")
  );
  const [message, setMessage] = useState("");
  const [quackMode, setQuackMode] = useState(false);
  const [response, setResponse] = useState<any[]>([]);
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  const getMessage = async (hat: string) => {
    const response = await fetch("/api/quack", {
      method: "POST",
      body: JSON.stringify({ message, hat, quackMode }),
    });
    return await response.json();
  };
  const handleClick = async () => {
    const response = await Promise.all(
      ["Blue Duck", "red", "green", "yellow", "black", "white"].map(async (v) =>
        getMessage(v)
      )
    );
    setResponse(response);
    console.log(response);
  };
  const Card = ({ message, hat }: any) => {
    return (
      <div className="flex justify-center items-start max-w-[600px] max-h-[400px] overflow-y-auto rounded-lg bg-white text-black px-6 py-6">
        <div>
          <span>{hat}</span>
          <p>{message.introduction}</p>
          <ul>
            {message.bulletPoints.map((v: string) => (
              <li key={v}>* {v}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const handleQuackMode = (e: any) => {
    setQuackMode(e.target.checked);
    (quackSound as HTMLAudioElement).play();
  };
  return (
    <main className="flex flex-col min-h-screen bg-indigo-300 items-start pt-12">
      <div className="flex flex-col container items-center bg-gray-800 mx-auto rounded-2xl py-14 space-y-3">
        <div className="w-full md:w-1/2">
          <div className="flex w-full justify-center text-indigo-200">
            <span className="pb-6">
            Super-charge ideas by critically thinking about them in 6 different ways.
            </span>
            </div>
            <input
              className="w-full py-4 rounded-md border-2 border-indigo-500 text-black px-3 text-left"
              onChange={handleChange}
            ></input>
            <div className="flex justify-center space-x-2 py-4">
            <label htmlFor="quack" className="text-white">Enable quack mode</label>
            <Switch onClick={handleQuackMode} />
          </div>
          <div className="flex justify-end">
            <button
              className="w-full py-4 rounded-md text-white bg-indigo-500"
              onClick={handleClick}
            >
              Let’s break it down!
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-4 pt-8">
          {!!response.length &&
            response.map((v) => (
              <Card hat={v.hat} key={v.hat} message={v.result} />
            ))}
        </div>
      </div>
      </div>
    </main>
  );
}
