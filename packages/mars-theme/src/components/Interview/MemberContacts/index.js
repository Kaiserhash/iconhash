import React from "react";
import {styled} from "frontity";
import {LazyLoadImage} from "react-lazy-load-image-component/src";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import SocialsMenu from "../../SocialsMenu";
import memberIcon from "../../../../static/MemberOfTheMonth.svg";
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
                            authorAbout: {
                                fullname = '',
                                tagLink = {},
                                memberOfTheMonth = false,
                                socials = [],
                                date = ''
                            }
}) => (
   <Container>
     <MemberContainer>
         {
             memberOfTheMonth ?
             <MemberAchiveImage
                 alt={fullname}
                 src={memberIcon}
             />
                 : null
         }
         <div>
            <MemberName>{fullname}</MemberName>
            <MemberContainer>
                <PublishDate datetime={date}>{dayjs(date,'YYYY-MM-DDTHH:mm:ss').format('MMMM YYYY')}</PublishDate>
                <MemberLink href={tagLink?.url} target="_blank">{tagLink?.title}</MemberLink>
            </MemberContainer>
         </div>
     </MemberContainer>
     <DesktopSocials>
         <SocialsMenu socials={socials} />
     </DesktopSocials>
   </Container>
);

MemberContacts.propTypes = {
    authorAbout: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
        tagLink: PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired,
        memberOfTheMonth: PropTypes.bool.isRequired,
        socials: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired
            })
        ),
        date: PropTypes.string.isRequired
    }).isRequired
}

export default MemberContacts;