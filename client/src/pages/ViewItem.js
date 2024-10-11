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
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory, MdEditAttributes } from "react-icons/md";
import { BASE_URL } from "../App";
import { useAuthContext } from "../hooks/useAuthContext";

const ViewItem = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    data: itemDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`item${id}`, user],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/items/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
    <Flex justifyContent="center">
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      )}
      {isError && <div>Error fetching data</div>}
      {itemDetails && (
        <HStack spacing={10}>
          <Box boxSize="sm">
            <Image
              src={itemDetails.item.image_url}
              alt={itemDetails.item.name}
              boxSize="100%"
              objectFit="cover"
              borderRadius="md"
              boxShadow="lg"
            />
          </Box>

          <List spacing={3}>
            <ListItem>
              <Heading size="xl" color="teal.500">
                {itemDetails.item.name}
              </Heading>
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={FaBoxOpen} color="blue.500" />
              Quantity: {itemDetails.item.quantity}
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={FaMoneyBillWave} color="green.500" />
              Price: {itemDetails.item.price}
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={MdCategory} color="purple.500" />
              Category: {itemDetails.item.category}
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={MdEditAttributes} color="yellow.500" />
              Attributes:{" "}
              <OrderedList>
                {Object.entries(itemDetails.item.attributes).map(
                  ([key, value]) => (
                    <ListItem key={key} fontSize="sm">
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

            <ListItem fontSize="lg">
              Status:{" "}
              <Box
                fontWeight="bold"
                color={
                  itemDetails.item.status === "in_stock"
                    ? "green.500"
                    : "red.500"
                }
              >
                {itemDetails.item.status === "in_stock"
                  ? "In Stock"
                  : "Out of Stock"}
              </Box>
            </ListItem>
            <Text fontSize="lg">Brand: {itemDetails.item.brand}</Text>
            <ListItem fontSize="lg">
              <ListIcon as={FaLocationDot} color="orange.500" />
              Location:{" "}
              {itemDetails.godowns.map((godown) => godown.name).join(", ")}
            </ListItem>
          </List>
        </HStack>
      )}
    </Flex>
  );
};

export default ViewItem;
