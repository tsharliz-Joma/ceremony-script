import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold text-[#8E7754]">Welcome to My Celebrant Charles</h1>
      <p className="text-lg max-w-2xl mt-4 text-gray-700">
        Creating beautiful ceremonies, personalized for your special day.
      </p>
      <Link href="/ceremony">
        <Button variant="primary" size="lg" className="mt-6">
          Start Your Ceremony Script
        </Button>
      </Link>
    </div>
  );
}
