import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-5">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <h1 className="text-blue-500 font-barlow">Welcome to the Home Page</h1>
      <Button variant="destructive">Click Me</Button>
    </div>
  );
}
