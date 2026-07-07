import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <header className="relative z-10">
        <h1 className="font-extrabold text-fluid-9xl py-1 mbe-1 font-display">
          Nextjs Intro
        </h1>
      </header>
      <Image
        className="w-full h-auto object-cover z-0"
        src={"/pink-sky.jpg"}
        fill
        alt=""
        loading="eager"
      />
    </section>
  );
}
