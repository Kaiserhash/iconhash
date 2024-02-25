import {LazyLoadImage} from "react-lazy-load-image-component/src";
import React from "react";
import {styled} from "frontity";
import PropTypes from "prop-types";
import {theme} from "../../../constants/theme";

const Image = styled(LazyLoadImage)({
    width: '100%',
    borderRadius: '12px',
    marginBottom: '15px',
    height: '192px',
    objectFit: 'cover',
    objectPosition: 'center',
    [`@media (min-width: ${theme.screens.lg})`]: {
        height: '460px',
    }
});
const InterviewBanner = ({ url,title = 'image',width = 100,height = 100 }) => (
    <Image
        alt={title}
        height={height}
        src={url}
        width={width}
    />
);


InterviewBanner.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}

export default InterviewBanner;