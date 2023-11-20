import { pb } from "@/services/pocketbase";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUserData = () => {
  if (!pb.authStore.isValid) {
    return Promise.reject("Invalid session");
  } else {
    // console.log("actually making the network request: ", component);
    return pb.collection("users").getOne<User>(pb.authStore.model?.id);
  }
};

export const useUser = () => {
  // console.log("fetching user from !", component);
  const queryResponse = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUserData(),
  });
  return queryResponse;
};
