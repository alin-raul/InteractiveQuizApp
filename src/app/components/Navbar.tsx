import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center w-full h-14 fixed top-0 z-50">
        <div className="flex items-center max-w-screen-2xl w-full h-full px-4 mx-auto bg-background">
          <Link href="/" className="flex gap-4 items-center w-fit">
            <Image
              src="/logo/nextquiz.webp"
              alt="logo quiz"
              width={50}
              height={50}
              priority
              className="w-auto h-auto"
              draggable="false"
            />
          </Link>
          <div className="ml-8 flex justify-between w-full ">
            <div className="flex gap-4">
              <Link
                href="/discoverQuiz"
                className="font-bold text-lg active:outline-b-4 "
              >
                Discover Quiz
              </Link>
              <Link href="/leaderboard" className="font-bold text-lg">
                Leaderboard
              </Link>
              <Link href="/about" className="font-bold text-lg">
                About
              </Link>
            </div>

            <div className="ml-8 flex gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
