import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Button,
  VStack,
  Collapse,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import Item from "./Item";
import { BASE_URL } from "../App";
import { useAuthContext } from "../hooks/useAuthContext";

const Godown = ({ id, name, level }) => {
  const { user } = useAuthContext();
  const {
    data: subgodowns,
    isLoading1,
    isError1,
  } = useQuery({
    queryKey: [`subgodowns${id}`, user],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/locations/subgodowns/${id}`,
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
  });

  const {
    data: items,
    isLoading2,
    isError2,
  } = useQuery({
    queryKey: [`items${id}`, user],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/items/godown/${id}`, {
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

  const [isExpanded, setIsExpanded] = useState(false);
  const color = useColorModeValue(`blue.${level * 300}`, `teal.${level * 100}`);

  return (
    <>
      <Button
        leftIcon={isExpanded ? <FaFolderOpen /> : <FaFolder />}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        color={color}
        fontSize={"lg"}
      >
        {name}
      </Button>
      <Collapse in={isExpanded}>
        {(isLoading1 || isLoading2) && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={color}
            size="xl"
          />
        )}
        {(isError1 || isError2) && <div>Error fetching data</div>}
        {items && (
          <VStack align="start" ml={4 * level}>
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </VStack>
        )}
        {subgodowns && (
          <VStack spacing={2} align="start" ml={4 * level}>
            {subgodowns.map((subgodown) => (
              <Godown key={subgodown.id} {...subgodown} level={level + 1} />
            ))}
          </VStack>
        )}
      </Collapse>
    </>
  );
};

export default Godown;
