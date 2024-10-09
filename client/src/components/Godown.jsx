import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import Item from "./Item";

const Godown = ({ id, name, level }) => {
  const {
    data: subgodowns,
    isLoading1,
    isError1,
  } = useQuery({
    queryKey: [`subgodowns${id}`],
    queryFn: async () => {
      try {
        const response = await fetch(`api/locations/subgodowns/${id}`);
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
    queryKey: [`items${id}`],
    queryFn: async () => {
      try {
        const response = await fetch(`api/items/godown/${id}`);
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

  return (
    <>
      {level}
      <Button
        leftIcon={isExpanded ? <FaFolderOpen /> : <FaFolder />}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {name}
      </Button>
      {isExpanded && (
        <>
          {(isLoading1 || isLoading2) && <div>Loading...</div>}
          {(isError1 || isError2) && <div>Error fetching data</div>}
          {items && (
            <ul>
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          )}
          {subgodowns && (
            <ul>
              {subgodowns.map((subgodown) => (
                <Godown key={subgodown.id} {...subgodown} level={level + 1} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default Godown;
