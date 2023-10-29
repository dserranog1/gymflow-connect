import LogOutButton from "./LogOutButton";
import { pb } from "@/services/pocketbase";

const Header = () => {
  return (
    <header className="bg-orange-600">
      {pb.authStore.isValid ? (
        <div className="flex flex-row justify-between items-center">
          <p>
            Sesión iniciada como{" "}
            <span className="text-slate-300">{pb.authStore.model?.name}</span>
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
