import Button from "@/components/button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center my-24 font-display">
      <h1 className="text-fluid-2xl">Event not Found</h1>
      <p className="text-fluid-lg">Could not find requested resource</p>
      <Button href="/">Return Home</Button>
    </div>
  );
}
