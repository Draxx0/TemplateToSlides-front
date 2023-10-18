import { useQuery } from "@tanstack/react-query";

const useGetTemplate = ({ id }: { id: string }) => {
  const query = useQuery({
   queryKey: ["templates", id],
   queryFn:
  });

  return {
    ...query,
  };
};

export default useGetTemplate;
