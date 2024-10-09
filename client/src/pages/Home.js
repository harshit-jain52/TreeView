import { useQuery } from "@tanstack/react-query";
import { VStack } from "@chakra-ui/react";
import Godown from "../components/Godown";

const Home = () => {
  const {
    data: godowns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["godowns"],
    queryFn: async () => {
      try {
        const response = await fetch("api/locations/godowns");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data || [];
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <VStack spacing={2} align="start" ml={4}>
        {godowns.map((godown) => (
          <Godown key={godown.id} {...godown} level={1} />
        ))}
      </VStack>
    </div>
  );
};

export default Home;
