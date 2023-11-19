import { useUser } from "@/hooks/use-user";
import LogOutButton from "./LogOutButton";
import { pb } from "@/services/pocketbase";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const { data: user, isLoading } = useUser("header");
  return (
    <header className="flex justify-center items-center bg-gradient-to-r from-[#FFA500] to-[#FF6347]">
      {pb.authStore.isValid && !isLoading ? (
        <div className="flex flex-row justify-between items-center">
          <p>
            {user && (
              <>
                Sesión iniciada como{" "}
                <span className="text-white">
                  {user.name + " " + user.lastName}
                </span>
              </>
            )}
          </p>
          <LogOutButton />
        </div>
      ) : (
        <Button asChild variant="link">
          <Link href="/">
            <span className="text-lg text-white">Gymflow connect</span>
          </Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
