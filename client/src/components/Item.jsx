import { FaEye } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

const Item = ({ item }) => {
  return (
    <Button
      leftIcon={<FaEye />}
      variant={"outline"}
      as={"a"}
      href={`/viewitem/${item.item_id}`}
    >
      {item.name}
    </Button>
  );
};

export default Item;
