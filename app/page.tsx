
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants/pricing-cards";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <Navbar />

      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
          <span className="text-amber-500 bg-amber-500/20 px-4 py-2 rounded-full text-sm">
            An Ai powered sales assistant chatbot
          </span>

          <Image
            src={"/images/corinna-ai-logo.png"}
            width={500}
            height={500}
            alt="LOgO"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-5xl text-muted-foreground">
            Your AI powered sales assistant! Embed Corinna AI into website
            <br />
            with just snippet of code
          </p>
          <Button className="bg-amber-500 font-bold text-white px-4">
            Start For Free
          </Button>

          <Image
            src={"/images/iphonecorinna.png"}
            alt="logo"
            width={400}
            height={100}
            loading="lazy"
          />
        </div>
      </section>
      <section className="mt-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl text-center">
            Choose what fit&apos;s you right
          </h1>
          <p className="text-muted-foreground text-center max-w-lg">
            Our straightforward plan are tailored to meet your need. If you are
            not ready to commit you can get stated for free
          </p>
        </div>
      </section>

      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={cn(
              "w-[300px] flex flex-col justify-between",
              card.title === "Ultimate" && "border-2 border-amber-500"
            )}
          >
            <CardHeader className="text-amber-500">
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-x-2">
                    <Check className="w-5 h-5 text-amber-500" />{" "}
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbaord?plan=${card.title}`}
                className="w-full bg-amber-500/50 text-center rounded-md p-2 font-bold border-2 border-amber-500"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
