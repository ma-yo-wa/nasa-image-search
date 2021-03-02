import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import nasaLogo from "../assets/nasa-logo.svg";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Search = () => {
  let history = useHistory();

  const handleSearch = async (query) => {
    history.push(`/gallery?q=${query}`);
  };

  return (
    <Container>
      <img
        style={{ marginBottom: "49px" }}
        src={nasaLogo}
        alt="NASA Logo"
        height="72"
      />
      <SearchBox onSearch={(query) => handleSearch(query)} />
    </Container>
  );
};

export default Search;
