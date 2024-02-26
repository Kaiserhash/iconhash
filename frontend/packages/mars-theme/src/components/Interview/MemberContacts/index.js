import React from "react";
import {styled} from "frontity";
import {LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import SocialsMenu from "../../SocialsMenu";
import memberIcon from "../../../../static/MemberOfTheMonth.svg";
import {theme} from "../../../constants/theme";
const Container = styled('div')({
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '100%',
    marginBottom: '15px',
    [`@media (min-width: ${theme.screens.lg})`]: {
        gridTemplateColumns: '2fr 1fr'
    }
});
const MemberContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const MemberAchiveImage = styled(LazyLoadImage)({
    maxWidth: '98px',
    width: '100% !important',
    maxHeight: '74px',
    marginRight: '15px'
});

const MemberName = styled('h1')({
    color: '#24313E',
    fontWeight: 700,
    fontSize: '20px',
    marginBottom: '2px',
    [`@media (min-width: ${theme.screens.lg})`]: {
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
                            scrollPosition,
                            authorAbout: {
                                fullname = '',
                                tagLink = {},
                                memberOfTheMonth = false,
                                socials = [],
                            },
                            date = new Date()
}) => {
    return (
        <Container>
            <MemberContainer>
                {
                    memberOfTheMonth ?
                        <MemberAchiveImage
                            scrollPosition={scrollPosition}
                            alt={fullname}
                            src={memberIcon}
                            width={98}
                            height={74}
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
    )
};

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
                link: PropTypes.string
            }).isRequired
        ).isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired
}

export default trackWindowScroll(MemberContacts);