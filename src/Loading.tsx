import React from "react";
import styled from "styled-components";
import Spinner from "./assets/Spinner.gif";
const Background = styled.div`
  position: absolute;
  left: 43%;
  top: 44%;
  img {
    width: 90px;
  }
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

const Loading = () => {
  return (
    <Background>
      <img src={Spinner} />
    </Background>
  );
};

export default Loading;
