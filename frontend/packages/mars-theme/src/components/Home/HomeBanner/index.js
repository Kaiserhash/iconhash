import {styled} from "frontity";
import {theme} from "../../../constants/theme";
import {LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import memberIcon from "../../../../static/MemberOfTheMonth.svg";
import Container from "../../Container";
import ReactCountryFlag from "react-country-flag";
import Link from "@frontity/components/link";


const SubContainer = styled.div`
   margin-bottom: 15px;
   @media (min-width: ${theme.screens.lg}) {
     border-top: 2px solid #89A0B8;
     margin-top: 3px;
   }
`

const ImageWrapper = styled.div`
  border-radius: 21px;
  position: relative;
  overflow: hidden;
  margin: 5px 0 19px 0;
  @media (min-width: ${theme.screens.lg}) {
    margin: 20px 0 14px 0;
  }
`

const MainImage = styled(LazyLoadImage)`
   width: 100% !important;
   object-fit: cover;
   object-position: center;
   height: 458px;
   @media (min-width: ${theme.screens.lg}) {
        height: 657px;
   }
`;

const AchievementsBlock = styled.div`
  position: absolute;
  width: 148px;
  top: 0;
  right:0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${theme.screens.lg}) {
    width: 232px;
    justify-content: flex-start;
  }
`

const MemberOfTheMonthImage = styled(LazyLoadImage)`
  width: 78px !important;
  height: 62px;
  object-fit: cover;
  object-position: center;
  margin: 18px;
  @media (min-width: ${theme.screens.lg}) {
    width: 128px !important;
    height: 100px;
    margin: 30px 50px;
  }
`;

const CountryImage = styled(LazyLoadImage)`
  max-width: 148px;
  max-height: 200px;
  width: 100% !important;
  @media (min-width: ${theme.screens.lg}) {
    max-width: 232px;
    max-height: 312px;
    height: 100%;
  }
`;

const InfoContainer = styled.div`
  background: var(--White, #FFF);
  padding: 24px 0;
  margin-bottom: 29px;
  @media (min-width: ${theme.screens.lg}) {
    margin-bottom: 37px;
  }
`

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 18px;
  @media (min-width: ${theme.screens.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`

const InfoLeftContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 10px;
  @media (min-width: ${theme.screens.lg}) {
    grid-gap: 22px;
    grid-template-columns: 1.5fr 1fr;
  }
`

const InfoRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Title = styled('h2')`
  color: ${theme.colors.black};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  @media (min-width: ${theme.screens.lg}) {
    color: ${theme.colors.black};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 26px;
  }
`

const CountryInfo = styled.div`
  border-radius: 8px;
  border: 1px solid var(--Light-1, #EAEEF1);
  background: #FFF;
  padding: 9px 20px 8px 12px;
  display: grid;
  grid-template-columns: 21px 1fr;
  grid-gap: 21px 1fr;
  align-items: center;
  color: var(--22, #425160);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  width: max-content;
  max-width: 100%;
`

const InterviewLink = styled(Link)`
  padding: 14px 94px 14px 95px;
  text-decoration: none;
  text-align: center;
  border-radius: 76px;
  background: var(--text---dark, #1C252F);
  color: var(--White, #FFF);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 100%;
  @media (min-width: ${theme.screens.lg}) {
    padding: 16px 39px 15px 40px;
    font-size: 18px;
    max-width: 280px;
  }
`

const HomeBanner = ({
 scrollPosition,
 link,
 acf: {
    mainBanner,
    authorInfo: { infoBlock: { countryImg, countryIcon,country } },
    authorAbout: { fullname = '' }
}}) => {
   return (
       <>
           <Container>
               <SubContainer>
                   <ImageWrapper>
                       <MainImage
                           alt={mainBanner?.title}
                           height={mainBanner?.height}
                           src={mainBanner?.url}
                           width={mainBanner?.width}
                           scrollPosition={scrollPosition}
                       />
                       <AchievementsBlock>
                           {
                               countryImg ? (
                                   <CountryImage
                                       alt={countryImg?.title}
                                       height={countryImg?.height}
                                       src={countryImg?.url}
                                       width={countryImg?.width}
                                       scrollPosition={scrollPosition}
                                   />
                               ): null
                           }
                           <MemberOfTheMonthImage
                               src={memberIcon}
                               width={78}
                               height={62}
                               scrollPosition={scrollPosition}
                           />
                       </AchievementsBlock>
                   </ImageWrapper>
               </SubContainer>
           </Container>
           <InfoContainer>
               <Container>
                   <InfoWrapper>
                     <InfoLeftContainer>
                          <Title>{fullname}</Title>
                          <CountryInfo>
                              <ReactCountryFlag countryCode={countryIcon} svg />
                              <span>Country: {country}</span>
                          </CountryInfo>
                     </InfoLeftContainer>
                     <InfoRightContainer>
                         <InterviewLink link={link}>Winer's interview</InterviewLink>
                     </InfoRightContainer>
                   </InfoWrapper>
               </Container>
           </InfoContainer>
       </>
   )
}
HomeBanner.propTypes = {
    link: PropTypes.string.isRequired,
    acf: PropTypes.shape({
        mainBanner: PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }).isRequired,
        authorAbout: PropTypes.shape({
            fullname: PropTypes.string.isRequired
        }).isRequired,
        authorInfo: PropTypes.shape({
            infoBlock: PropTypes.shape({
               countryImg: PropTypes.shape({
                   url: PropTypes.string.isRequired,
                   title: PropTypes.string.isRequired,
                   width: PropTypes.number.isRequired,
                   height: PropTypes.number.isRequired
               }),
               countryIcon: PropTypes.string.isRequired,
               country: PropTypes.string.isRequired,
            }).isRequired
        }).isRequired
    }).isRequired
}
export default trackWindowScroll(HomeBanner);