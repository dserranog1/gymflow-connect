import { useUser } from "@/hooks/use-user";
import LogOutButton from "./LogOutButton";
import { pb } from "@/services/pocketbase";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const { data: user, isLoading } = useUser();
  return (
    <header className="w-full bg-gradient-to-r from-[#FFA500] to-[#FF6347]">
      {pb.authStore.isValid && !isLoading ? (
        <div className="flex justify-between items-center flex-row">
          {user && (
            <>
              {user.isAdmin && (
                <div>
                  <Button asChild variant="link">
                    <Link href="/dashboard/classes">
                      <span className="text-lg text-white">Clases</span>
                    </Link>
                  </Button>
                  <Button className="" asChild variant="link">
                    <Link href="/dashboard/employees">
                      <span className="text-lg text-white">Empleados</span>
                    </Link>
                  </Button>
                </div>
              )}
              <div className="px-4">
                ¡Hola {" "}
                <span className="text-white">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                  {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}!
                </span>
              </div>
            </>
          )}
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
