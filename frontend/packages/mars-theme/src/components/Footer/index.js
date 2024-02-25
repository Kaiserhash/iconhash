import React from "react";
import Container from "../Container";
import {connect, styled} from "frontity";
import Title from "../Title";
import SocialsMenu from "../SocialsMenu";
import {theme} from "../../constants/theme";
import isMobileHook from "../../hooks/isMobileHook";

const FooterMobileContainer = styled('footer')`
  .container {
      display: grid;
      grid-template-columns: 100%;
  }
`

const FooterTop = styled('div')({
    padding: '20px 0',
    borderBottom: '1px solid #EAEEF1',
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const FooterDesktopContainer = styled('footer')`
  .container {
    display: grid;
    grid-gap: 15px;
    align-items: center;
    grid-template-columns: repeat(3,1fr);
  }
`

const Copyright = styled('div')({
    'padding': '13px 0',
    fontSize: '14px',
    textAlign: 'center',
    color: '#68717A',
    [`@media (min-width: ${theme.screens.lg})`]: {
        padding: 0
    }
})

const FooterMobile = ({title = '', socials = [], copyright = ''}) => (
    <FooterMobileContainer>
     <Container className="container">
         <FooterTop>
             <Title title={title} />
             <SocialsMenu socials={socials} />
         </FooterTop>
         <Copyright>{copyright}</Copyright>
     </Container>
    </FooterMobileContainer>
)

const FooterDesktop = ({title = '', socials = [], copyright = ''}) => (
   <FooterDesktopContainer>
       <Container className="container">
           <Title title={title} />
           <Copyright>{copyright}</Copyright>
           <SocialsMenu socials={socials} />
       </Container>
   </FooterDesktopContainer>
)

const Footer = ({state}) => {
  const isMobile = isMobileHook();
  const { acf: { footerSocialsMenu = [], copyright = '', footerTitle = ''} } = state.source.get("acf-options-page");
  return (
      isMobile ? <FooterMobile copyright={copyright} socials={footerSocialsMenu} title={footerTitle} />: <FooterDesktop copyright={copyright} socials={footerSocialsMenu} title={footerTitle} />
  )
}

export default connect(Footer)