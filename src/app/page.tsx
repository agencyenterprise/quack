"use client";
import { useState } from "react";
import Switch from "./components/Switch";
import Loader from "./components/loading";

export default function Home() {
  const [quackSound] = useState(
    typeof Audio !== "undefined" && new Audio("/quack.mp3")
  );
  const [message, setMessage] = useState("");
  const [quackMode, setQuackMode] = useState(false);
  const [response, setResponse] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
  const getImage = (hat: string) => {
    switch (hat) {
      case "blue":
        return "/blue-duck.png";
      case "red":
        return "/red-duck.png";
      case "green":
        return "/green-duck.png";
      case "yellow":
        return "/yellow-duck.png";
      case "black":
        return "/black-duck.png";
      case "white":
        return "/white-duck.png";
      default:
        return "/blue-duck.png";
    }
  };
  const getHatDescription = (hat: string) => {
    switch (hat) {
      case "blue":
        return "Blue Duck Process, Structure, Next Steps";
      case "red":
        return "Red Duck Emotional, Intuitive, Empathetic";
      case "green":
        return "Green Duck Creative, Similar Ideas, Alternatives";
      case "yellow":
        return "Yellow Duck Benefits, Positivity, Useful outcomes";
      case "black":
        return "Black Duck Steel-Man, Cautious, Negatives";
      case "white":
        return "White Duck Neutral, Fact-based, Objective";
      default:
        return "Red Duck Emotional, Intuitive, Empathetic";
    }
  };
  const handleClick = async () => {
    setLoading(true);
    const response = await Promise.all(
      ["blue", "red", "green", "yellow", "black", "white"].map(async (v) =>
        getMessage(v)
      )
    );
    setResponse(response);
    console.log(response);
    setLoading(false);
  };
  const Card = ({ message, hat }: any) => {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full h-full bg-white px-6 py-6 md:px-8  md:py-8 rounded-t-md flex-col md:space-y-2 sm:space-y-2 sm:px-8  sm:py-8">
          <span className="text-slate-700 text-base">
            {message.introduction}
          </span>
          <ul style={{ listStyleType: "disc" }}>
            {message.bulletPoints.map((v: string) => (
              <li className="text-slate-700" key={v}>
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex relative w-full flex-row items-end bg-indigo-600 rounded-b-md px-4 py-4">
          <img src={getImage(hat)} className="w-12 md:w-16 absolute" />
          <div className="flex flex-col md:flex-row w-full items-left md:items-center pl-4 md:pl-20">
            <span className="text-white text-sm md:text-center pl-10 md:pl-0">
              {getHatDescription(hat).split(" ").slice(0, 2).join(" ")}
            </span>
            <span className="text-indigo-300 text-xs text-center pl-2">
              {getHatDescription(hat)
                .split(" ")
                .slice(2, -1)
                .join(" ")
                .endsWith(",")
                ? getHatDescription(hat)
                    .split(" ")
                    .slice(2, -1)
                    .join(" ")
                    .slice(0, -1)
                : getHatDescription(hat).split(" ").slice(2, -1).join(" ")}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const handleQuackMode = (e: any) => {
    setQuackMode(e.target.checked);
    (quackSound as HTMLAudioElement).play();
  };
  return (
    <main className="flex flex-col min-h-screen bg-indigo-300 items-start pt-12 px-4 md:px-0">
      <div className="flex flex-col container items-center bg-gray-800 mx-auto rounded-2xl py-14 space-y-3">
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="text-3xl text-center text-white font-bold">
            Quack Advice
          </h1>
        </div>
        <div className="w-full md:w-1/2 px-4 md:px-0">
          <div className="flex w-full justify-center text-indigo-200">
            <span className="pb-6">
              Super-charge ideas by critically thinking about them in 6
              different ways.
            </span>
          </div>
          <textarea
            className="w-full py-4 h-48 rounded-md border-2 border-indigo-500 text-black px-3 text-left"
            onChange={handleChange}
            placeholder="Enter your idea. Any details you can add around the problem being solved will make the outcome even better."
          ></textarea>
          <div className="flex justify-center space-x-2 py-4">
            <label htmlFor="quack" className="text-white">
              Enable quack mode
            </label>
            <Switch onClick={handleQuackMode} />
          </div>
          <div className="flex flex-col justify-end">
            <button
              className="w-full py-4 rounded-md text-white bg-indigo-500"
              onClick={handleClick}
            >
              Let’s break it down!
            </button>
            <div className="pt-4 text-indigo-200 text-sm">
              <span>GPT can take quacking forever to load sometimes. Blame them, not us. QUACK!</span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-end">
              <Loader />
            </div>
          )}
        </div>
        <div className="flex justify-center w-full">
          <div className="grid lg:grid-cols-2 md:grid-cols-1  sm:grid-cols-1 gap-4 pt-8 px-6 md:px-24">
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
