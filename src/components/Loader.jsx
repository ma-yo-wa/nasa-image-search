import React from "react";
import { Roller } from "react-awesome-spinners";
import styled from "styled-components";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 100px;
`;

const Loader = () => {
  return (
    <Centered>
      <Roller />
    </Centered>
  );
};

export default Loader;
