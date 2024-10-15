import { Box, Text } from "@chakra-ui/react";

const ResultItem = (item) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Text fontWeight="bold" fontSize={"sm"}>
        {item.name}
      </Text>
      <Text fontSize={"2xs"}>{item.category}</Text>
    </Box>
  );
};

export default ResultItem;
