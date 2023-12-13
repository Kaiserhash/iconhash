import React,{ useMemo } from "react";
import {styled} from "frontity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Menu = styled('ul')(({columns = 1}) => ({
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: `repeat(${columns},26px)`,
    gridGap: '6px',
    alignItems: 'center',
    '@media (min-width: 990px)': {
        gridTemplateColumns: `repeat(${columns},32px)`,
        justifyContent: 'end'
    }
}))

const MenuItem = styled('li')({
    '& a': {
        display: 'flex',
        width: '26px',
        height: '26px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7FA',
        borderRadius: '7px',
        color: '#85859B',
        textDecoration: 'none',
        '@media (min-width: 990px)': {
            width: '32px',
            height: '32px',
        }
    }
})

const SocialsMenu = ({socials = []}) => {
   const columns = useMemo(() => socials.length,[socials])
    return (
        <Menu className="social-menu" columns={columns}>
            {
                socials.map(({link,icon},index) => (
                    <MenuItem className="social-menu__item" key={index}>
                        <a href={link.url} title={link.title}>
                            <FontAwesomeIcon icon={icon} />
                        </a>
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

SocialsMenu.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            link: PropTypes.shape({
                url: PropTypes.string.isRequired,
                title: PropTypes.string
            }).isRequired
        }).isRequired
    ).isRequired
}

export default SocialsMenu