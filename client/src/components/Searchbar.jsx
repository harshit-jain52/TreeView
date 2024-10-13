import { useState } from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";

const Searchbar = ({ setSearchTerm, searchIcon }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 800);
  };

  return (
    <InputGroup size={"lg"}>
      <InputLeftElement pointerEvents="none" children={searchIcon} />
      <Input
        type="text"
        placeholder="Search Godowns"
        value={search}
        onChange={handleChange}
      />
      {search && (
        <InputRightElement>
          <Button
            onClick={() => {
              setSearch("");
              setSearchTerm("");
            }}
          >
            <IoIosCloseCircle />
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Searchbar;
