import { Box, Text } from "@chakra-ui/react";

const ResultGodown = (godown) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Text fontWeight="bold" fontSize={"sm"}>
        {godown.name}
      </Text>
      <Text fontSize={"2xs"}>{godown.absolute_address}</Text>
    </Box>
  );
};

export default ResultGodown;
