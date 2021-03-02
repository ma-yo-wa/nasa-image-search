import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import Error from "./Error";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchBox = (props) => {
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSearch = async (query) => {
    if (!query) {
      setError("Please, type your search to proceed");
      return;
    }

    props.onSearch(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event.target.value);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Search for images"
        />
        <Button onClick={() => handleSearch(query)}>Search</Button>
      </SearchContainer>
      {error && <Error error={error} />}
    </Container>
  );
};

export default SearchBox;
