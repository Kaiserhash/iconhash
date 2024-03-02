import React, { useMemo } from 'react';
import PropTypes from "prop-types";
import {styled} from "frontity";
import {theme} from "../../../constants/theme";
import {LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";
import memberIcon from "../../../../static/MemberOfTheMonth.svg";
import ReactCountryFlag from "react-country-flag";
import SocialsMenu from "../../SocialsMenu";
import dayjs from "dayjs";
import Link from "@frontity/components/link";

const Container = styled.div`
  border-radius: 19px;
  background: var(--White, #FFF);
  box-shadow: 0px 4px 17px 0px rgba(197, 203, 235, 0.09);
  height: max-content;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid var(--Primary, #293BDC);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  margin: 20px 20px 15px 20px;
  height: 170px;
  @media (min-width: ${theme.screens.lg}){
    height: 320px;
    margin: 30px 30px 26px 30px;
  }
`;

const MainImage = styled(LazyLoadImage)`
  width: 100% !important;
  object-fit: cover;
  object-position: center;
  height: 100%;
  border-radius: 12px;
  @media (min-width: ${theme.screens.lg}){
    height: 100%;
  }
`;

const AchievementsContainer = styled.div`
  padding: 11px 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  @media (min-width: ${theme.screens.lg}){
    padding: 11px;
    flex-direction: column;
    left: inherit;
    bottom: 0;
  }
`;

const MemberOfTheMonthImage = styled(LazyLoadImage)`
  width: 48px !important;
  height: 38px;
  object-fit: cover;
  object-position: center;
  @media (min-width: ${theme.screens.lg}) {
    width: 95px !important;
    height: 75px;
    order: 2;
  }
`;

const CountryBadge = styled.div`
  border-radius: 8px;
  background: #FFF;
  padding: 7px 9px;
  display: grid;
  grid-template-columns: 17px max-content;
  grid-gap: 6px;
  align-items: center;
  color: var(--22, #425160);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  width: max-content;
  @media (min-width: ${theme.screens.lg}) {
    order: 1;
    padding: 10px 12px;
    grid-template-columns: 21px max-content;
  }
`;

const AboutContainer = styled.div`
  padding: 0px 20px 13px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${theme.screens.lg}) {
    grid-row-gap: 2px;
    padding: 0px 30px 25px 30px;
    grid-template-columns: repeat(3,1fr);
    align-items: inherit;
  }
`;

const Title = styled('h4')`
  color: var(--etxt, #24313E);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  @media (min-width: ${theme.screens.lg}) {
    order: 1;
    font-size: 20px;
  }
`;

const TagInfo = styled.div`
  & .label {
    display: none;
    color: var(--Secondary, #68717A);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 4px;
  }
  & .link {
    text-decoration: none;
    color: var(--Primary, #293BDC);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
  }
  @media (min-width: ${theme.screens.lg}) {
    order: 3;
    & .label {
      display: block;
    }
    & .link {
      font-size: 16px;
    }
  }
`;

const SocialsMenuContainer = styled.div`
  @media (min-width: ${theme.screens.lg}) {
    order: 4;
  }
`;

const DateBlock = styled.time`
  color: var(--etxt, #24313E);
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  @media (min-width: ${theme.screens.lg}) {
    order: 2;
    grid-column: 1;
    grid-row: 3;
  }
`;

const InfoContainer = styled.div`
  padding: 20px 20px 13px 20px;
  border-top: 1px solid #EAEEF1;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 15px;
  .country {
    order: 1;
  }
  .city {
    order: 2;
  }
  .height  {
    order: 3;
  }
  .profession {
    order: 4;
    grid-column: span 3;
  }
  .link {
    order: 5;
    grid-column: span 3;
  }
  @media (min-width: ${theme.screens.lg}) {
    align-items: inherit;
    grid-template-columns: 1fr 1fr 1fr 1fr 2fr;
    grid-gap: 12px;
    justify-content: space-between;
    .country {
      order: 1;
    }
    .city {
      order: 2;
    }
    .height  {
      order: 4;
    }
    .profession {
      order: 3;
      grid-column: auto;
    }
    .link {
      order: 5;
      grid-column: auto;
    }
  }
`;

const InfoItem = styled.div`
 & .label {
   color: var(--Secondary, #68717A);
   font-size: 12px;
   font-style: normal;
   font-weight: 500;
 }
 & .value {
   color: var(--etxt, #24313E);
   font-size: 14px;
   font-style: normal;
   font-weight: 600;
 }
  @media (min-width: ${theme.screens.lg}) {
    border-right: 1px solid #EAEEF1;
    padding-right: 12px;
    & .label {
      font-size: 14px;
    }
    & .value {
      font-size: 16px;
    }
  }
`;

const CustomLink = styled(Link)`
  height: max-content;
  text-decoration: none;
  display: block;
  padding: 14px;
  border-radius: 76px;
  border: 1px solid var(--Light-1, #EAEEF1);
  text-align: center;
  color: var(--etxt, #24313E);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  @media (min-width: ${theme.screens.lg}) {
    font-size: 16px;
    padding: 12px;
    max-width: 196px;
    margin-left: auto;
    width: 100%;
  }
`;

const HomeInterview = ({
    scrollPosition,
    isMobile = false,
    link = '',
    date = new Date(),
    acf: {
        mainBanner,
        authorInfo: {
            infoBlock: {
                city = '',
                country = '',
                countryIcon = '',
                profession = '',
            },
            personalChar: {
                height = 0
            }
        },
        authorAbout: {
            fullname = '',
            memberOfTheMonth = false,
            socials = [],
            tagLink
        }
    },
                       }) => {
    const dateTime = useMemo(() => dayjs(date).format('DD.MM.YYYY'),[date]);
    return (
        <Container>
            <ImageContainer>
                <MainImage
                    alt={mainBanner?.title}
                    height={mainBanner?.height}
                    src={mainBanner?.url}
                    width={mainBanner?.width}
                    scrollPosition={scrollPosition}
                />
                <AchievementsContainer>
                    {
                        memberOfTheMonth ? (
                            <MemberOfTheMonthImage
                                src={memberIcon}
                                width={48}
                                height={38}
                                scrollPosition={scrollPosition}
                            />
                        ): null
                    }
                    <CountryBadge>
                        <ReactCountryFlag countryCode={countryIcon} svg />
                        <span>{isMobile ? countryIcon: country}</span>
                    </CountryBadge>
                </AchievementsContainer>
            </ImageContainer>
            <AboutContainer>
              <Title>{fullname}</Title>
              <TagInfo>
                  <div className="label">Name in hash cast</div>
                  <a href={tagLink?.url} target="_blank">#{tagLink?.title}</a>
              </TagInfo>
              <SocialsMenuContainer>
                  <SocialsMenu socials={socials} />
              </SocialsMenuContainer>
              <DateBlock datetime={dateTime}>{dateTime}</DateBlock>
            </AboutContainer>
            <InfoContainer>
               <InfoItem className="country">
                   <div className="label">Country</div>
                   <div className="value">{country}</div>
               </InfoItem>
                <InfoItem className="city">
                    <div className="label">City</div>
                    <div className="value">{city}</div>
                </InfoItem>
                <InfoItem className="profession">
                    <div className="label">Profession</div>
                    <div className="value">{profession}</div>
                </InfoItem>
                <InfoItem className="height">
                    <div className="label">Height</div>
                    <div className="value">{height}</div>
                </InfoItem>
                <CustomLink className="link" link={link}>Read more</CustomLink>
            </InfoContainer>
        </Container>
    )
}

HomeInterview.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  acf: PropTypes.shape({
      mainBanner: PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired
      }).isRequired,
      authorInfo: PropTypes.shape({
          infoBlock: PropTypes.shape({
              city: PropTypes.string.isRequired,
              country: PropTypes.string.isRequired,
              countryIcon: PropTypes.string.isRequired,
              profession: PropTypes.string.isRequired,
          }),
          personalChar: PropTypes.shape({
              height: PropTypes.string.isRequired
          }).isRequired
      }).isRequired,
      authorAbout: PropTypes.shape({
          fullname: PropTypes.string.isRequired,
          memberOfTheMonth: PropTypes.bool.isRequired,
          socials: PropTypes.arrayOf(
              PropTypes.shape({
                  link: PropTypes.string.isRequired,
                  icon: PropTypes.string.isRequired
              })
          ).isRequired,
          tagLink: PropTypes.shape({
              title: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired
          })
      })
  }).isRequired
}
export default trackWindowScroll(HomeInterview);