import React from "react";
import MemberInformationContainer from "../MemberInformationContainer";
import {styled} from "frontity";
import {LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";
import MemberAboutList from "./MemberAboutList";
import MemberCharsList from "./MemberCharsList";
import PropTypes from "prop-types";
import {theme} from "../../../constants/theme";

const Container = styled('div')({
    backgroundColor: '#F7F9FE',
    padding: '20px 15px',
    [`@media (min-width: ${theme.screens.lg})`]: {
        borderRadius: '18px',
    }
});

const AvatarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px'
});

const Avatar = styled(LazyLoadImage)({
    width: '76px !important',
    height: '76px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
    [`@media (min-width: ${theme.screens.lg})`]: {
        width: '184px !important',
        height: '184px',
    }
});

const Title = styled('h4')({
    color: theme.colors.black,
    textAlign: 'center',
    marginBottom: '17px',
    fontWeight: 700,
    fontSize: '22px',
    display: 'none',
    [`@media (min-width: ${theme.screens.lg})`]: {
        display: 'block'
    }
});

const Subtitle = styled('h5')({
    fontWeight: 500,
    fontSize: '16px',
    marginBottom: '15px',
    color: '#425160',
    [`@media (min-width: ${theme.screens.lg})`]: {
        fontSize: '18px',
    }
});


const MemberInformation = ({ scrollPosition,authorInfo: { avatar,infoBlock = {},personalChar={} } }) => (
   <Container>
       {
           Object.values(avatar || {}).length &&
           (
               <AvatarContainer>
                   <Avatar
                       alt={avatar.title}
                       height={avatar.height}
                       src={avatar.url}
                       width={avatar.width}
                       scrollPosition={scrollPosition}
                   />
               </AvatarContainer>
           )
       }
       {
           Object.values(infoBlock || {}).length && (
               <>
                   <Title>Information</Title>
                   <MemberAboutList infoBlock={infoBlock} />
               </>
           )
       }
       {
           Object.values(personalChar || {}).length &&
           (
               <>
                   <Subtitle>Personal characteristics</Subtitle>
                   <MemberCharsList personalChar={personalChar} />
               </>
           )
       }
   </Container>
);

MemberInformation.propTypes = {
    authorInfo: PropTypes.shape({
        avatar: PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,
        infoBlock: PropTypes.shape({
            country: PropTypes.string.isRequired,
            countryIcon: PropTypes.string,
            city: PropTypes.string.isRequired,
            profession: PropTypes.string.isRequired
        }).isRequired,
        personalChar: PropTypes.shape({
            hairsColor: PropTypes.string.isRequired,
            eyesColor: PropTypes.string.isRequired,
            height: PropTypes.string.isRequired,
            weight: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired
};

export default trackWindowScroll(MemberInformationContainer(MemberInformation));