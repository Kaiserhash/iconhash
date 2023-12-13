import React,{ useLayoutEffect, useMemo } from "react";
import {connect, styled} from "frontity";
import InterviewNavigation from "../../components/Interview/InterviewNavigation";
import InterviewBanner from "../../components/Interview/InterviewBanner";
import MemberInformation from "../../components/Interview/MemberInformation";
import MemberContacts from "../../components/Interview/MemberContacts";
import SocialsMenu from "../../components/SocialsMenu";
import Container from "../../components/Container";
import InterviewContent from "../../components/Interview/InterviewContent";
import ReadAlsoBlock from "../../components/Interview/ReadAlsoBlock";
import InterviewGallery from "../../components/Interview/InterviewGallery";
import ShareBlock from "../../components/ShareBlock";
const ContentContainer = styled(Container)({
  '&.content-container': {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: '35px',
      marginBottom: '18px',
      '@media (min-width: 990px)': {
          gridTemplateColumns: '2fr 1fr'
      }
  }
});

const Wrapper = styled('div')({
    padding: '20px 0',
    backgroundColor: '#fff'
});

const MobileBlock = styled('div')({
    '@media (min-width: 990px)': {
        display: 'none'
    }
});
const DesktopBlock = styled('div')({
    '@media (max-width: 990px)': {
        display: 'none'
    }
});
const InterviewPage = ({state,data,actions}) => {
    useLayoutEffect(() => {
        actions.source.fetch("/interviews");
    }, []);
    const { items = [] } = state.source.get("/interviews");
    console.log(items)
    const page = state.source[data.type][data.id];
    console.log(page)
    const {
        date,
        acf: {
            mainBanner,
            authorInfo = {},
            authorAbout = {},
            topContent = '',
            readAlso = {},
            gallery = [],
            bottomContent = '',
            socialsBlock = []
    } } = page;
    const getNav = useMemo(() => {
        const getIndex = items.findIndex(({id}) => id === +data.id);
        return {
            prevUrl: getIndex > 0 ? items[getIndex - 1]?.link: '/',
            nextUrl: getIndex + 1 < items.length ? items[getIndex + 1]?.link: '/',
        }
    },[items,data.id]);
    return (
        <>
            <Container>
                <InterviewNavigation prevUrl={getNav.prevUrl} nextUrl={getNav.nextUrl} />
                <InterviewBanner url={mainBanner.url} width={mainBanner.width} height={mainBanner.height} title={mainBanner.title} />
            </Container>
           <Wrapper>
               <ContentContainer className="content-container">
                   <div>
                       <MemberContacts
                           authorAbout={authorAbout}
                           date={date}
                       />
                       <MobileBlock>
                           <MemberInformation
                               authorInfo={authorInfo}
                           />
                           <SocialsMenu  socials={authorAbout?.socials} />
                       </MobileBlock>
                       <InterviewContent content={topContent} />
                       {Object.values(readAlso).length ? <ReadAlsoBlock readAlso={readAlso} /> : null}
                       <InterviewContent content={bottomContent} />
                   </div>
                   <DesktopBlock>
                       <MemberInformation
                           authorInfo={authorInfo}
                       />
                   </DesktopBlock>
                   <MobileBlock>
                       <ShareBlock socialsBlock={socialsBlock} />
                   </MobileBlock>
               </ContentContainer>
           </Wrapper>
            <Container>
                <InterviewGallery gallery={gallery} />
                <DesktopBlock>
                    <ShareBlock socialsBlock={socialsBlock} />
                </DesktopBlock>
            </Container>
        </>
    )
}

export default connect(InterviewPage);