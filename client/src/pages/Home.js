import { useQuery } from "@tanstack/react-query";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import Godown from "../components/Godown";
import { BASE_URL } from "../App";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const {
    data: godowns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["godowns", user],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/locations/godowns`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
    <>
      <VStack spacing={2} align="start" ml={4}>
        {godowns.map((godown) => (
          <Godown key={godown.id} {...godown} level={1} />
        ))}
      </VStack>
    </>
  );
};

export default Home;
