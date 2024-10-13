import { FaEye } from "react-icons/fa";
import { Button, Box } from "@chakra-ui/react";

const Item = ({ item }) => {
  return (
    <Button
      leftIcon={<FaEye />}
      variant={"outline"}
      as={"a"}
      href={`/viewitem/${item.item_id}`}
      maxW={"95%"}
    >
      <Box as="span" noOfLines={1}>
        {item.name}
      </Box>
    </Button>
  );
};

export default Item;
