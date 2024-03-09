import { useEffect, useState } from "react";
import styled from "styled-components";

const Layout = styled.main``;
const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-around;
  height: 680px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 2rem;
`;
const Textarea = styled.textarea<{ color: string }>`
  resize: none;
  width: 100%;
  height: 580px;
  border-radius: 25px;
  border: solid 2px ${(prop) => prop.color};
  padding: 1rem;
`;

const ResultBox = styled.div`
  resize: none;
  width: 100%;
  height: 580px;
  border-radius: 25px;
  border: solid 2px ${(prop) => prop.color};
  padding: 1rem;
  ol {
    padding-left: 0;
  }
  li {
    display: flex;
    line-height: 27px;
    padding: 0px 10px 0px 10px;
    cursor: pointer;
    &:hover {
      font-weight: 600;
      border: solid 2px #e67e22;
      border-radius: 20px;
    }
  }

  span {
    display: none;
    margin-top: 40px;
  }
`;

const Button = styled.button<{ color: string }>`
  width: 100%;
  height: 60px;
  border-radius: 25px;
  border: ${(prop) => prop.color};
  background-color: ${(prop) => prop.color};
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

interface IQuiz {
  question: String;
  options: String;
  answer: Number | any;
}

function App() {
  const [data, setData] = useState<IQuiz>();
  const [value, setValue] = useState();

  const onClickMakeButton = () => {
    fetch("https://wdw6st9941.execute-api.ap-northeast-2.amazonaws.com/dev/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Fetch 에러:", error));
  };

  const onClickCopyButton = () => {
    const { question, options, answer } = data as IQuiz;
    // console.log(question, options, answer);
    // navigator.clipboard
    //   .writeText(JSON.stringify(clipboardData))
    //   .then(() => {
    //     console.log("데이터가 클립보드에 복사되었습니다.");
    //   })
    //   .catch((error) => {
    //     console.error("클립보드 복사 중 오류가 발생했습니다:", error);
    //   });
  };

  const onClickOption = (e: any) => {
    const answerNum = data?.answer;
    const clickNum = e.target.value;

    if (answerNum === clickNum) {
      return alert("정답");
    } else {
      return alert("오답");
    }
  };

  return (
    <Layout>
      <Title>문제 만들기</Title>
      <Main>
        <Box>
          <Textarea maxLength={3000} onChange={(e: any) => setValue(e.target.value)} color="#27ae60" />
          <Button onClick={onClickMakeButton} color="#27ae60">
            만들기
          </Button>
        </Box>
        <Box>
          <ResultBox color="#E67E22">
            <h3>{data?.question}</h3>
            <ol>
              {data?.options.split("\n").map((option, idx) => (
                <li value={idx + 1} style={{ listStyle: "none" }} onClick={(e) => onClickOption(e)} key={idx}>
                  {option}
                </li>
              ))}
            </ol>
          </ResultBox>
        </Box>
      </Main>
    </Layout>
  );
}

export default App;
