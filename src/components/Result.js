import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CSSreset from "styled-reset";
import indicaSrc from "../image/indica.png";
import logoSrc from "../image/beer-logo.png";

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const location = useLocation();
  const { E_I, S_N, T_F, J_P } = location.state.params;
  let beerResult;
  if (E_I >= 5) {
    beerResult = "IPA";
  } else {
    beerResult = "Cass";
  }

  //Styled Component
  //Outer
  const GlobalStyles = createGlobalStyle`
    ${CSSreset};
    body {
      @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
      font-family: "Noto Sans KR", sans-serif !important;
    }
`;
  const Container = styled.div``;
  const InnerContainer = styled.div`
    max-width: 320px;
    margin: 0 auto;
  `;

  //Header
  const Header = styled.div`
    display: flex;
    justify-content: left;
  `;
  const Logo = styled.img`
    width: 70px;
  `;
  const Title = styled.h1`
    font-size: 28px;
    margin-left: 12px;
  `;

  //Loading Page
  const LoadingPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const LoadingImg = styled.img``;
  const LoadingTitle = styled.h1``;

  //Result Page
  const ResultPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const BeerImg = styled.img`
    margin-top: 24px;
    width: 240px;
  `;
  const BeerTitle = styled.h1`
    margin-top: 24px;
    font-size: 24px;
  `;
  const BeerSubtitle = styled.h2``;
  const BeerDesc = styled.h3``;
  const ShareBox = styled.div``;

  return (
    <>
      <GlobalStyles />
      <Container>
        <InnerContainer>
          <Header>
            <Logo src={logoSrc} />
            {/* <Title>#수제맥주 테스트</Title> */}
          </Header>
          {isLoading ? (
            <LoadingPage>
              <LoadingImg />
              <LoadingTitle>로딩중...</LoadingTitle>
            </LoadingPage>
          ) : (
            <ResultPage>
              <BeerImg src={indicaSrc} />
              <BeerTitle>{beerResult}</BeerTitle>
              <BeerSubtitle />
              <BeerDesc />
              <ShareBox />
            </ResultPage>
          )}
        </InnerContainer>
      </Container>
    </>
  );
};

export default Result;
