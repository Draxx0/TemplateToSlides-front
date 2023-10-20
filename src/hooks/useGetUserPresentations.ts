import { useQuery } from "@tanstack/react-query";
import PresentationService from "../services/presentation.service";

const useGetUserPresentations = (id: string) => {
  const query = useQuery({
    queryKey: ["presentations", id],
    queryFn: () => PresentationService.getAllUserPresentation(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    ...query,
  };
};

export default useGetUserPresentations;
