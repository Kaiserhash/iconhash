import React, {useMemo} from 'react';
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

const MemberCharsList = ({personalChar: { hairsColor,eyesColor,weight,height }}) => {
    const charList = useMemo(() => [
        {
            id: 1,
            subtitle: 'Hairs color',
            title: hairsColor
        },
        {
            id: 2,
            subtitle: 'Eyes color',
            title: eyesColor
        },
        {
            id: 3,
            subtitle: 'Height',
            title: height
        },
        {
            id: 4,
            subtitle: 'Weight',
            title: weight
        }
    ],[hairsColor,eyesColor,weight,height])
    return (
        <CharsList>
            {
                charList.map(({title,subtitle,id}) => (
                    <CharsListItem key={id}>
                        <CharsListSubtitle>{subtitle}</CharsListSubtitle>
                        <CharsListTitle>{title}</CharsListTitle>
                    </CharsListItem>
                ))
            }
        </CharsList>
    )
}

MemberCharsList.propTypes = {
    personalChar: PropTypes.shape({
        hairsColor: PropTypes.string.isRequired,
        eyesColor: PropTypes.string.isRequired,
        weight: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
    }).isRequired
};

export default MemberCharsList;