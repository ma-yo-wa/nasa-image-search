import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: red;
  text-align: center;
  margin-top: 21px;
`;

const Error = ({ error }) => {
  return <Text>{error}</Text>;
};

export default Error;
