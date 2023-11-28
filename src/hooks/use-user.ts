import { pb } from "@/services/pocketbase";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUserData = () => {
  if (!pb.authStore.isValid) {
    return Promise.reject("Invalid session");
  } else {
    // console.log("actually making the network request: ", component);
    const users = pb.collection("users").getList();
    return pb.collection("users").getOne<User>(pb.authStore.model?.id);
  }
};

export const getFilteredUserList = (filter: string) => {
  return pb.collection("users").getFullList<User>({ filter });
};

export const useUser = () => {
  const queryResponse = useQuery({
    queryKey: ["user", pb.authStore.model?.id],
    queryFn: () => getCurrentUserData(),
  });
  return queryResponse;
};

export const UseFilteredUserList = (filter: string) => {
  const queryResponse = useQuery({
    queryKey: ["user", filter], //use the filter as key in case we want to reuse this exact query
    queryFn: () => getFilteredUserList(filter),
  });
  return queryResponse;
};
