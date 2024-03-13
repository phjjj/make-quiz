import React from "react";
import styled from "styled-components";
import Spinner from "./assets/Spinner.gif";
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
