import { useQuery } from "@tanstack/react-query"; 
import { vrpRequest } from "../../utils/https-request/vrp/VrpRequest";

function useGetVrp() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["vrp"],
    queryFn: vrpRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetVrp;
