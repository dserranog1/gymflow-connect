import { useUser } from "@/hooks/use-user";
import LogOutButton from "./LogOutButton";
import { pb } from "@/services/pocketbase";

const Header = () => {
  const { data: user, isLoading } = useUser("header");
  return (
    <header className="bg-orange-600">
      {pb.authStore.isValid && !isLoading ? (
        <div className="flex flex-row justify-between items-center">
          <p>
            Sesión iniciada como{" "}
            <span className="text-slate-300">
              {user?.name + " " + user?.lastName}
            </span>
          </p>
          <LogOutButton />
        </div>
      ) : (
        <div>Gymflow connect</div>
      )}
    </header>
  );
};

export default Header;
