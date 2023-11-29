"use client";

// @ts-ignore
import { PricingPage } from "sds-projects";

export default function Pricing() {
  return (
    <PricingPage
      freeTierFeatures={[
        "quackity quack",
        "Unlimited access",
        "free quacks",
        "It’s like magic quack quack quack",
      ]}
    />
  );
}
