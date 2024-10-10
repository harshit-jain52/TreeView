import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  HStack,
  Image,
  List,
  ListItem,
  Heading,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";
import { FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory, MdEditAttributes } from "react-icons/md";

const ViewItem = () => {
  const { id } = useParams();

  const {
    data: itemDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`item${id}`],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data || {};
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}
      {itemDetails && (
        <HStack>
          <Box boxSize="sm">
            <Image
              src={itemDetails.item.image_url}
              alt={itemDetails.item.name}
            />
          </Box>

          <List>
            <ListItem>
              <Heading>{itemDetails.item.name}</Heading>
            </ListItem>
            <ListItem>
              <ListIcon as={FaBoxOpen} />
              Quantity: {itemDetails.item.quantity}
            </ListItem>
            <ListItem>
              <ListIcon as={FaMoneyBillWave} />
              Price: {itemDetails.item.price}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCategory} />
              Category: {itemDetails.item.category}
            </ListItem>
            <ListItem>
              <ListIcon as={MdEditAttributes} />
              Attributes:{" "}
              <OrderedList>
                {Object.entries(itemDetails.item.attributes).map(
                  ([key, value]) => (
                    <ListItem key={key}>
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                      : {value}
                    </ListItem>
                  )
                )}
              </OrderedList>
            </ListItem>

            <ListItem
              color={itemDetails.item.status === "in_stock" ? "green" : "red"}
            >
              Status:{" "}
              {itemDetails.item.status === "in_stock"
                ? "In Stock"
                : "Out of Stock"}
            </ListItem>
            <p>Brand: {itemDetails.item.brand}</p>
            <ListItem>
              <ListIcon as={FaLocationDot} />
              Location:{" "}
              {itemDetails.godowns.map((godown) => godown.name).join(", ")}
            </ListItem>
          </List>
        </HStack>
      )}
    </div>
  );
};

export default ViewItem;
