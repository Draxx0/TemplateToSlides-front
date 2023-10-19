import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "../services/template.service";

const useGetTemplates = () => {
  const query = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
  };
};

export default useGetTemplates;
