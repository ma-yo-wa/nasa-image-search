import React from "react";
import styled from "styled-components";
import nasaLogo from "../assets/nasa-logo.svg";
import { Link } from "react-router-dom";
import Searchbox from "../components/SearchBox";

const Nasa = styled.img`
  @media (max-width: 640px) {
    margin-bottom: 28px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <Link to="/">
        <Nasa
          src={nasaLogo}
          alt="NASA images"
          title="NASA images"
          height="64"
        />
      </Link>
      <Searchbox value={props.searchTerm} onSearch={props.handleSearch} />
    </HeaderContainer>
  );
};

export default Header;
