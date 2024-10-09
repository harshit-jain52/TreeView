import { useQuery } from "@tanstack/react-query";
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
      <h1>Godowns</h1>
      <ul>
        {godowns.map((godown) => (
          <Godown key={godown.id} {...godown} level={1} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
