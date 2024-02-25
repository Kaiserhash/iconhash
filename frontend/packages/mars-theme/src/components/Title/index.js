import React from "react";
import Link from "@frontity/components/link";
import {styled} from "frontity";
import PropTypes from "prop-types";
import {theme} from "../../constants/theme";

const TitleLink = styled(Link)({
    padding: '7px 0',
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'italic',
    fontWeight: 800,
    color: '#24313E',
    fontSize: '20px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'block',
    [`@media (min-width: ${theme.screens.lg})`]: {
        fontSize: '34px'
    }
})
const Title = ({title}) => <TitleLink link="/">{title}</TitleLink>

Title.propTypes = {
    title: PropTypes.string.isRequired
}
export default Title