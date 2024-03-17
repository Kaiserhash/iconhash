import React, { useMemo } from 'react';
import ReactCountryFlag from "react-country-flag";
import {styled} from "frontity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {theme} from "../../../../constants/theme";

const AboutList = styled('ul')({
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: '4px',
    marginBottom: '15px',
    [`@media (min-width: ${theme.screens.lg})`]: {
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
    [`@media (min-width: ${theme.screens.lg})`]: {
        fontSize: '14px',
    }
});

const AboutListTitle = styled('div')({
    color: theme.colors.black,
    fontWeight: 600,
    fontSize: '14px',
    [`@media (min-width: ${theme.screens.lg})`]: {
        fontSize: '18px',
    }
});
const MemberAboutList = ({infoBlock: { country = '',countryIcon = '',city = '',profession  }}) =>  {
    const aboutList = useMemo(() => [
        {
            id: 1,
            title: country,
            subtitle: 'Country',
            icon: 'fa-solid fa-earth-americas',
            additionalIcon: countryIcon
        },
        {
            id: 2,
            title: city,
            subtitle: 'City',
            icon: 'fa-solid fa-earth-americas',
        },
        {
            id: 3,
            title: profession,
            subtitle: 'Profession',
            icon: 'fa-solid fa-lightbulb',
        }
    ],[country,countryIcon,city,profession])
    return (
        <AboutList>
            {
                aboutList.map(({id,name,icon,additionalIcon,subtitle,title}) => (
                    <AboutListItem key={id}>
                        <AboutListContainer>
                            <AboutListIcon icon={icon} />
                            <div>
                                <AboutListSubtitle>{subtitle}</AboutListSubtitle>
                                <AboutListTitle>{title}</AboutListTitle>
                            </div>
                        </AboutListContainer>
                        { additionalIcon ? <ReactCountryFlag countryCode={additionalIcon} svg />: null }
                    </AboutListItem>
                ) )
            }
        </AboutList>
    );
};

MemberAboutList.propTypes = {
    infoBlock: PropTypes.shape({
        country: PropTypes.string.isRequired,
        countryIcon: PropTypes.string,
        city: PropTypes.string.isRequired,
        profession: PropTypes.string.isRequired
    }).isRequired
};

export default MemberAboutList;