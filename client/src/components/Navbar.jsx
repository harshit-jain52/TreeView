import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import {
  Container,
  Box,
  useColorMode,
  useColorModeValue,
  Grid,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuSun, LuMoon } from "react-icons/lu";
import { FaPowerOff, FaHome } from "react-icons/fa";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.300", "gray.700");
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const isMdScreenOrLarger = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW={"1000px"}>
      <Box bg={bg} borderRadius={"7"} px={4} my={4}>
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          gap={3}
          h={20}
        >
          <Button
            variant={"ghost"}
            leftIcon={<FaPowerOff />}
            onClick={() => {
              user ? logout() : window.open("/login", "_self");
            }}
            fontSize={"xl"}
            justifySelf={"start"}
          >
            {user ? "Logout" : "Login"}
          </Button>

          <Button
            variant={"link"}
            fontSize={"3xl"}
            onClick={() => window.open("/", "_self")}
          >
            {isMdScreenOrLarger ? <FaHome /> : "Tree View Application"}
          </Button>
          <Button onClick={toggleColorMode} fontSize={"xl"} justifySelf={"end"}>
            {colorMode === "dark" ? <LuSun /> : <LuMoon />}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default Navbar;
