import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";

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
  position: relative;
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
  background-color: ${(prop) => (prop.disabled ? "#CCCCCC" : prop.color)};
  color: white;
  font-size: 20px;
  cursor: ${(prop) => (prop.disabled ? "not-allowed" : "pointer")};
`;

interface IQuiz {
  question: String;
  options: String;
  answer: Number | any;
}

function App() {
  const [data, setData] = useState<IQuiz>();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);

  const onClickMakeButton = async () => {
    setLoading(false);
    setDisable(true);
    await fetch("https://wdw6st9941.execute-api.ap-northeast-2.amazonaws.com/dev/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setDisable(false);

        setData(data);
      })
      .catch((error) => console.error("Fetch 에러:", error));
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
      <Title>인스턴트 퀴즈</Title>
      <Main>
        <Box>
          <Textarea maxLength={3000} onChange={(e: any) => setValue(e.target.value)} color="#27ae60" />
          <Button disabled={disable} onClick={onClickMakeButton} color="#27ae60">
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
            {loading ? null : <Loading />}
          </ResultBox>
        </Box>
      </Main>
    </Layout>
  );
}

export default App;
