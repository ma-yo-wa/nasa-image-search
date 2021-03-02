import styled from "styled-components";

const Button = styled.button`
  width: 15%;
  height: 49px;
  color: white;
  background-color: rgb(19, 140, 211);
  border: transparent solid 1px;

  @media (max-width: 640px) {
    margin: auto;
    height: 40px;
    margin-top: 20px;
    width: 35%;
  }
`;

export default Button;
