import { pb } from "@/services/pocketbase";
import { Class, Employee } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getEmployeesData = () => {
  if (!pb.authStore.isValid) {
    return Promise.reject("Invalid session");
  } else {
    return pb.collection("employees").getFullList<Employee>({});
  }
};

export const useEmployees = () => {
  const queryResponse = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeesData(),
  });
  return queryResponse;
};
