import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Image } from "@chakra-ui/react";

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
        console.log(data);
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
        <>
          <Box boxSize="sm">
            <Image
              src={itemDetails.item.image_url}
              alt={itemDetails.item.name}
            />
          </Box>

          <div>
            <h2>{itemDetails.item.name}</h2>
            <p>Quantity: {itemDetails.item.quantity}</p>
            <p>Category: {itemDetails.item.category}</p>
            {Object.entries(itemDetails.item.attributes).map(([key, value]) => (
              <p key={key}>{`${key}: ${value}`}</p>
            ))}
            <p>Price: {itemDetails.item.price}</p>
            <p>Status: {itemDetails.item.status}</p>
            <p>Brand: {itemDetails.item.brand}</p>
            <p>Godown: {itemDetails.godown.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewItem;
