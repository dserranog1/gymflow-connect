import { pb } from "@/services/pocketbase";
import { Class } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getClassesData = () => {
  if (!pb.authStore.isValid) {
    return Promise.reject("Invalid session");
  } else {
    return pb.collection("classes").getFullList<Class>({});
  }
};

export const useClasses = () => {
  const queryResponse = useQuery({
    queryKey: ["classes"],
    queryFn: () => getClassesData(),
  });
  return queryResponse;
};
