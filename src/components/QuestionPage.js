import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import CSSreset from "styled-reset";
import beerLogoSrc from "../image/beer-logo.png";

import QnA from "../QnA.json";

const QuestionPage = () => {
  const [score, setScore] = useState({
    //낮을수록 전자(Larger, Light, Fruity, Creamy)
    //높을수록 후자(Ale, Heavy, Not Fruity, Crispy)
    largerOrAle: 0,
    drinkability: 0,
    fruity: 0,
    alcohol: 0,
  });
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const MAX_INDEX = QnA.length;

  useEffect(() => {
    if (index === MAX_INDEX) {
      history.push("/result", { params: score });
    }
  }, [index]);

  const answerClicked = (item) => {
    for (const prop in item) {
      setScore((prev) => ({
        ...prev,
        [prop]: prev[prop] + item[prop],
      }));
      setIndex(index + 1);
    }
  };

  return (
    <Background>
      <GlobalStyles />
      <Container>
        <InnerContainer>
          <Navbar>
            <QuestNumber>Q{index + 1}.</QuestNumber>
            <StatusBar>
              {index + 1}/{MAX_INDEX}
            </StatusBar>
          </Navbar>
          {index < MAX_INDEX && (
            <>
              <Question>{QnA[index].question}</Question>
              <Icon src={beerLogoSrc} />

              <AnswerBox>
                {QnA[index].answers.map(({ answer, score }) => {
                  return (
                    <AnswerButton onClick={() => answerClicked(score)}>
                      {answer}
                    </AnswerButton>
                  );
                })}
              </AnswerBox>
            </>
          )}
        </InnerContainer>
      </Container>
    </Background>
  );
};

//Styling Area
const GlobalStyles = createGlobalStyle`
  ${CSSreset};

  body {
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
    font-family: "Noto Sans KR", sans-serif !important;
  }
`;
const Background = styled.div``;
const Container = styled.div`
  margin: 0 auto;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Navbar
const Navbar = styled.div`
  width: 80%;
  min-width: 330px;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 48px 0 24px;
`;
const QuestNumber = styled.div`
  color: #33a8ff;
  font-size: 30px;
  font-weight: 700;
`;
const StatusBar = styled.div`
  color: #b7b7b7;
  font-size: 14px;
`;

//Body
const Icon = styled.img`
  width: 150px;
  margin-bottom: 24px;
`;
const Question = styled.h1`
  margin: 24px 0;
  font-size: 24px;
`;
const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const AnswerButton = styled.button`
  min-width: 300px;
  margin-top: 4px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  background-color: black;
  &:hover {
    background-color: #33a8ff;
  }
`;
export default QuestionPage;
