"use client";
import { useState } from "react";
export default function Home() {
  const [message, setMessage] = useState("");
  const [quackMode, setQuackMode] = useState(false);
  const [response, setResponse] = useState<any[]>([]);
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  const quackSound = new Audio("/quack.mp3");
  const getMessage = async (hat: string) => {
    const response = await fetch("/api/quack", {
      method: "POST",
      body: JSON.stringify({ message, hat, quackMode }),
    });
    return await response.json();
  };
  const handleClick = async () => {
    const response = await Promise.all(
      ["blue", "red", "green", "yellow", "black", "white"].map(async (v) =>
        getMessage(v)
      )
    );
    setResponse(response);
    console.log(response);
  };
  const Card = ({ message, hat }: any) => {
    return (
      <div className="flex justify-center items-start max-w-[600px] max-h-[400px] overflow-y-auto bg-white text-black pl-3">
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
    console.log(e.target.checked);
    setQuackMode(e.target.checked);
    quackSound.play();
  };
  return (
    <main className="flex flex-col justify-center items-start pt-12">
      <div className="flex flex-col container mx-auto space-y-3">
        <div className="flex justify-center space-x-2">
          <label htmlFor="quack">Quack Mode</label>
          <input id="quack" type="checkbox" onChange={handleQuackMode} />
        </div>
        <input
          className="min-w-[700px] h-[50px] border-2 border-indigo-500 text-black px-3 text-left"
          onChange={handleChange}
        ></input>

        <div className="flex justify-end">
          <button
            className="w-[150px] h-[30px] bg-indigo-500"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-4">
          {!!response.length &&
            response.map((v) => (
              <Card hat={v.hat} key={v.hat} message={v.result} />
            ))}
        </div>
      </div>
    </main>
  );
}
