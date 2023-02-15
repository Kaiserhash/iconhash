import React from 'react';
import PropTypes from "prop-types";
import {connect, styled} from "frontity";
import {LazyLoadComponent} from "react-lazy-load-image-component/src";

const Content = styled('div')({
 'p,blockquote,img,h1,h2,h3,h4,h5,h6': {
   marginBottom: '15px'
 },
 'img': {
   width: '100%',
   height: 'auto'
 },
 'blockquote': {
    borderLeft: '6px solid #293BDC',
    fontSize: '15px',
    fontWeight: 600,
    paddingLeft: '15px',
    '@media (min-width: 990px)': {
         fontSize: '18px',
    }
 },

});

const InterviewContent = ({content = '',libraries}) => {
    const Html2React = libraries.html2react.Component;
    return (
        <LazyLoadComponent>
            <Content>
                <Html2React html={content} />
            </Content>
        </LazyLoadComponent>
    )
};

InterviewContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default connect(InterviewContent);