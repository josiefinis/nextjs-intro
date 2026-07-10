import Image from "next/image";
import Button from "@/components/button";
import background from "@/public/pink-sky.jpg";
import wingedHeart from "@/public/winged-heart.png";
import fallingEmbers from "@/public/falling-embers.png";

export default function Hero() {
  return (
    <section className="relative">
      <header className="relative z-10">
        <Image
          className="w-full h-auto object-cover pbs-4 z-30"
          src={wingedHeart}
          alt=""
        />
        <h1 className="font-fruktur text-fluid-9xl py-1 text-center text-pink-50">
          JosifiniX
        </h1>
      </header>
      <Image
        className="w-full h-auto object-cover z-0"
        src={background}
        fill
        alt=""
        loading="eager"
      />
      <Image
        className="w-full h-auto object-cover z-20"
        src={fallingEmbers}
        fill
        alt=""
      />
      <div className="flex justify-end items-center gap-8 p-4">
        <p className="text-pink-50 text-fluid-3xl z-10 font-protest-revolution">
          up in Smoke
        </p>
        <Button
          href="/listen"
          classes="bg-pink-100 text-pink-600 uppercase text-fluid-xl"
        >
          Out Now
        </Button>
      </div>
    </section>
  );
}
