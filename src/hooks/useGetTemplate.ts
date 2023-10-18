import { useQuery } from "@tanstack/react-query";
import { getTemplate } from "../services/template.service";

const useGetTemplate = ({ id }: { id: string | null }) => {
  const query = useQuery({
    queryKey: ["templates", id],
    queryFn: () => getTemplate(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    ...query,
  };
};

export default useGetTemplate;
