import { useQuery } from "@tanstack/react-query";
import { VStack, Spinner, Text } from "@chakra-ui/react";
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
        const response = await fetch(
          "http://localhost:5000/api/locations/godowns"
        );
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
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    );
  }

  if (isError) {
    return <Text color={"red.500"}>Error fetching data</Text>;
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
