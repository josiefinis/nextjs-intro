import Image from "next/image";

export default function MerchPage() {
  return (
    <div className="flex flex-col items-center *:mx-4 *:md:mx-12">
      <h1 className="text-fluid-4xl font-display">Merch</h1>
      <article
        aria-labelledby="time-and-death"
        className="flex flex-col items-center"
      >
        <h2 className="font-display text-fluid-2xl" id="time-and-death">
          Time and Death
        </h2>
        <figure>
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/1/1f/Time_and_Death.jpg"
            }
            alt="Illustration of a skull atop an hourglass with outspread wings and a snake entwined."
            width={960}
            height={600}
          />
          <figcaption className="text-fluid-lg font-semibold">
            Illustration by Edmund J. Sullivan from <i>Sartor Resartus</i> by
            Thomas Carlyle. 1898
          </figcaption>
        </figure>
      </article>
    </div>
  );
}
