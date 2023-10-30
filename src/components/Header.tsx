import { useUser } from "@/hooks/use-user";
import LogOutButton from "./LogOutButton";
import { pb } from "@/services/pocketbase";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const { data: user, isLoading } = useUser("header");
  return (
    <header className="bg-orange-600">
      {pb.authStore.isValid && !isLoading ? (
        <div className="flex flex-row justify-between items-center">
          <p>
            Sesión iniciada como{" "}
            <span className="text-amber-300">
              {user?.name + " " + user?.lastName}
            </span>
          </p>
          <LogOutButton />
        </div>
      ) : (
        <Button asChild variant="link">
          <Link href="/">Gymflow connect</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
