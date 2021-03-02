import styled from "styled-components";

const Input = styled.input`
  width: 30%;
  margin-right: 20px;
  height: 49px;
  padding: 0 14px;

  @media (max-width: 640px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default Input;
