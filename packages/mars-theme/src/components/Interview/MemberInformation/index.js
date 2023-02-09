import React from "react";
import MemberInformationContainer from "../MemberInformationContainer";
import {styled} from "frontity";
import {LazyLoadImage} from "react-lazy-load-image-component/src";
import MemberAboutList from "./MemberAboutList";
import MemberCharsList from "./MemberCharsList";
import PropTypes from "prop-types";

const Container = styled('div')({
    backgroundColor: '#F7F9FE',
    padding: '20px 15px',
    '@media (min-width: 990px)': {
        borderRadius: '18px',
    }
});

const AvatarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px'
});

const Avatar = styled(LazyLoadImage)({
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
    '@media (min-width: 990px)': {
        width: '184px',
        height: '184px',
    }
});

const Title = styled('h4')({
    color: '#24313E',
    textAlign: 'center',
    marginBottom: '17px',
    fontWeight: 700,
    fontSize: '22px',
    display: 'none',
    '@media (min-width: 990px)': {
        display: 'block'
    }
});

const Subtitle = styled('h5')({
    fontWeight: 500,
    fontSize: '16px',
    marginBottom: '15px',
    color: '#425160',
    '@media (min-width: 990px)': {
        fontSize: '18px',
    }
});


const MemberInformation = ({ avatar,infoTitle = '',aboutList = [],personalInfoTitle = '',personalInfo = [] }) => (
   <Container>
     <AvatarContainer>
        <Avatar
            alt={avatar.title}
            height={avatar.height}
            src={avatar.url}
            width={avatar.width}
        />
     </AvatarContainer>
     <Title>{infoTitle}</Title>
     <MemberAboutList aboutList={aboutList} />
     <Subtitle>{personalInfoTitle}</Subtitle>
     <MemberCharsList personalInfo={personalInfo}/>
   </Container>
);

MemberInformation.propTypes = {
    personalInfo: PropTypes.arrayOf(
        PropTypes.shape({
            subtitle: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    aboutList: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            additionalIcon: PropTypes.string
        }).isRequired
    ).isRequired,
    avatar: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    infoTitle: PropTypes.string.isRequired,
    personalInfoTitle: PropTypes.string.isRequired
};

export default MemberInformationContainer(MemberInformation);