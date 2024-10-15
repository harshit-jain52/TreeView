import { useState } from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  CheckboxGroup,
  Checkbox,
  Stack,
  Portal,
} from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { LuListFilter } from "react-icons/lu";

const Searchbar = ({
  setSearchTerm,
  setCategories,
  searchIcon,
  itemFilters,
  defaultText,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState(itemFilters);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 800);
  };

  const handleFilterChange = (val) => {
    setFilters(val);
    setCategories(val);
  };

  return (
    <InputGroup size={"lg"}>
      <InputLeftElement pointerEvents="none" children={searchIcon} />
      <Input
        type="text"
        placeholder={defaultText}
        value={search}
        onChange={handleChange}
      />
      <Stack direction="row">
        {search && (
          <Button
            ml={2}
            onClick={() => {
              setSearch("");
              setSearchTerm("");
            }}
          >
            <IoIosCloseCircle />
          </Button>
        )}
        <Popover>
          <PopoverTrigger>
            <Button ml={2}>
              <LuListFilter />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent zIndex={10}>
              <PopoverBody>
                <CheckboxGroup
                  colorScheme="green"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <Stack direction="column">
                    {itemFilters.map((filter) => (
                      <Checkbox key={filter} value={filter}>
                        {filter}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Stack>
    </InputGroup>
  );
};

export default Searchbar;
