import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: red;
  text-align: center;
`;

const Error = ({ error }) => {
  return <Text>{error}</Text>;
};

export default Error;
