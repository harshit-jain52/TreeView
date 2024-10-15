import { useQuery } from "@tanstack/react-query";
import { VStack, Spinner, Text, Flex } from "@chakra-ui/react";
import Godown from "../components/Godown";
import ResultGodown from "../components/ResultGodown";
import ResultItem from "../components/ResultItem";
import { BASE_URL } from "../App";
import { useAuthContext } from "../hooks/useAuthContext";
import Searchbar from "../components/Searchbar";
import FilterSearchBar from "../components/FilterSearchBar";
import { useState } from "react";
import { FaSearchLocation, FaSearchDollar } from "react-icons/fa";
import { itemCategories } from "../App";

const Home = () => {
  const { user } = useAuthContext();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [categories, setCategories] = useState(itemCategories);

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

  const {
    data: filteredGodowns,
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
  } = useQuery({
    queryKey: ["filteredGodowns", user, searchLocation],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/locations/search/${searchLocation}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
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
    enabled: !!searchLocation,
  });

  const {
    data: filteredItems,
    isLoading: isLoadingFiltered2,
    isError: isErrorFiltered2,
  } = useQuery({
    queryKey: ["filteredItems", user, searchItem, categories],
    queryFn: async () => {
      try {
        const categoriesString = categories.join(",");
        const response = await fetch(
          `${BASE_URL}/api/items/search?query=${searchItem}&categories=${categoriesString}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
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
    enabled: !!searchItem,
  });

  return (
    <>
      <VStack mx={10}>
        <Searchbar
          setSearchTerm={setSearchLocation}
          searchIcon={<FaSearchLocation />}
          defaultText="Search for godowns"
        />
        {isLoadingFiltered && (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        )}
        {isErrorFiltered && <Text color={"red.500"}>Error searching data</Text>}
        {filteredGodowns && (
          <Flex direction="row" wrap="wrap" gap={4}>
            {filteredGodowns.map((godown) => (
              <ResultGodown key={godown.id} {...godown} />
            ))}
          </Flex>
        )}
      </VStack>

      <VStack mx={10}>
        <FilterSearchBar
          setSearchTerm={setSearchItem}
          searchIcon={<FaSearchDollar />}
          itemFilters={itemCategories}
          setCategories={setCategories}
          defaultText="Search for items"
        />
        {isLoadingFiltered2 && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        )}
        {isErrorFiltered2 && <Text color={"red.500"}>Error fetching data</Text>}
        {filteredItems && (
          <Flex direction="row" wrap="wrap" gap={4}>
            {filteredItems.map((item) => (
              <ResultItem key={item.id} {...item} />
            ))}
          </Flex>
        )}
      </VStack>

      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      )}
      {isError && <Text color={"red.500"}>Error fetching data</Text>}
      {godowns && (
        <VStack spacing={2} align="start" ml={4}>
          {godowns.map((godown) => (
            <Godown key={godown.id} {...godown} level={1} />
          ))}
        </VStack>
      )}
    </>
  );
};

export default Home;
