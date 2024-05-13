import React from 'react';
import Container from "../Container";
import {connect, styled} from "frontity";
import Title from "../Title";

const HeaderWrapper = styled('div')({
  borderBottom: '1px solid #89A0B8;'
})


const Header = ({state}) => {
  const { acf: { headerTitle } } = state.source.get("acf-options-page");
  return (
      <Container>
        <HeaderWrapper style={{textAlign: 'center'}}>
           <Title  title={headerTitle} />
           Test
        </HeaderWrapper>
      </Container>
  )
}

export default connect(Header)