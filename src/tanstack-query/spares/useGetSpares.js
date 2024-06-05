import { useQuery } from "@tanstack/react-query"; 

import { sparesRequest } from "../../utils/https-request/spares/sparesRequest";

function useGetSpares() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["spares"],
    queryFn: sparesRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSpares;
