import React from 'react';
import ReactCountryFlag from "react-country-flag";
import {styled} from "frontity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const AboutList = styled('ul')({
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: '4px',
    marginBottom: '15px',
    '@media (min-width: 990px)': {
        gridGap: '10px'
    }
});

const AboutListItem = styled('li')({
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '14px',
    display: 'grid',
    gridTemplateColumns: '10fr 1fr',
    alignItems: 'center'
});

const AboutListContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const AboutListIcon = styled(FontAwesomeIcon)({
    marginRight: '8px',
    fontSize: '18px'
});

const AboutListSubtitle = styled('div')({
    color: '#68717A',
    fontWeight: 500,
    fontSize: '12px',
    '@media (min-width: 990px)': {
        fontSize: '14px',
    }
});

const AboutListTitle = styled('div')({
    color: '#24313E',
    fontWeight: 600,
    fontSize: '14px',
    '@media (min-width: 990px)': {
        fontSize: '18px',
    }
});
const MemberAboutList = ({aboutList = []}) => (
    <AboutList>
        {
            aboutList.map(({icon,subtitle,title,additionalIcon = ''},index) => (
                <AboutListItem key={index}>
                    <AboutListContainer>
                        <AboutListIcon icon={icon} />
                        <div>
                            <AboutListSubtitle>{subtitle}</AboutListSubtitle>
                            <AboutListTitle>{title}</AboutListTitle>
                        </div>
                    </AboutListContainer>
                    { additionalIcon ? <ReactCountryFlag countryCode={additionalIcon} />: null }
                </AboutListItem>
            ) )
        }
    </AboutList>
);

MemberAboutList.propTypes = {
    aboutList: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            additionalIcon: PropTypes.string
        }).isRequired
    ).isRequired
};

export default MemberAboutList;