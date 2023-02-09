import React from "react";
import {styled} from "frontity";
import {LazyLoadImage} from "react-lazy-load-image-component/src";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import SocialsMenu from "../../SocialsMenu";

const Container = styled('div')({
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '100%',
    marginBottom: '15px',
    '@media (min-width: 990px)': {
        gridTemplateColumns: '2fr 1fr'
    }
});
const MemberContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const MemberAchiveImage = styled(LazyLoadImage)({
    maxWidth: '98px',
    maxHeight: '74px',
    marginRight: '15px'
});

const MemberName = styled('h1')({
    color: '#24313E',
    fontWeight: 700,
    fontSize: '20px',
    marginBottom: '2px',
    '@media (min-width: 990px)': {
        fontSize: '26px',
        marginBottom: '7px'
    }
});


const PublishDate = styled('time')({
    fontWeight: 400,
    fontSize: '16px',
    marginRight: '15px',
    color: '#425160'
});

const MemberLink = styled('a')({
    fontWeight: 600,
    color: '#293BDC',
    textDecoration: 'none'
});

const DesktopSocials = styled('div')({
    '@media (max-width: 990px)': {
        display: 'none !important'
    }
});

const MemberContacts = ({
                            memberOfTheMonth = false,
                            imgMemberOfTheMonth,
                            fullname = '',
                            date = '',
                            instagramUrl = '',
                            instagramUrlText = '',
                            socialsMember = []
}) => (
   <Container>
     <MemberContainer>
         {
             memberOfTheMonth ?
             <MemberAchiveImage
                 alt={imgMemberOfTheMonth?.title}
                 src={imgMemberOfTheMonth?.url}
                 width={imgMemberOfTheMonth?.width}
                 height={imgMemberOfTheMonth?.height}
             />
                 : null
         }
         <div>
            <MemberName>{fullname}</MemberName>
            <MemberContainer>
                <PublishDate datetime={date}>{dayjs(date).format('MMMM YYYY')}</PublishDate>
                <MemberLink href={instagramUrl} target="_blank">{instagramUrlText}</MemberLink>
            </MemberContainer>
         </div>
     </MemberContainer>
     <DesktopSocials>
         <SocialsMenu socials={socialsMember} />
     </DesktopSocials>
   </Container>
);

MemberContacts.propTypes = {
    memberOfTheMonth: PropTypes.bool.isRequired,
    imgMemberOfTheMonth:  PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    fullname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    instagramUrl: PropTypes.string.isRequired,
    instagramUrlText: PropTypes.string.isRequired,
    socialsMember: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
}

export default MemberContacts;