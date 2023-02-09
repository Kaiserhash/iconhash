import React from 'react';
import {styled} from "frontity";
import PropTypes from "prop-types";

const CharsList = styled('ul')({
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: '7px',
    '@media (min-width: 990px)': {
        gridGap: '10px'
    }
});

const CharsListItem = styled('li')({
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '14px',
});

const CharsListSubtitle = styled('div')({
    color: '#68717A',
    fontWeight: 500,
    fontSize: '12px',
    '@media (min-width: 990px)': {
        fontSize: '14px',
    }
});

const CharsListTitle = styled('div')({
    color: '#24313E',
    fontWeight: 600,
    fontSize: '14px',
    '@media (min-width: 990px)': {
        fontSize: '18px',
    }
});

const MemberCharsList = ({personalInfo = []}) => (
   <CharsList>
       {
           personalInfo.map(({title,subtitle},index) => (
               <CharsListItem key={index}>
                   <CharsListSubtitle>{subtitle}</CharsListSubtitle>
                   <CharsListTitle>{title}</CharsListTitle>
               </CharsListItem>
           ))
       }
   </CharsList>
);

MemberCharsList.propTypes = {
    personalInfo: PropTypes.arrayOf(
        PropTypes.shape({
            subtitle: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
};

export default MemberCharsList;