import React from 'react';
import PropTypes from "prop-types";
import {styled} from "frontity";

const Content = styled('div')({
 'p,blockquote,img,h1,h2,h3,h4,h5,h6': {
   marginBottom: '15px'
 },
 'img': {
   width: '100%',
   minHeight: '190px',
   '@media (min-width: 990px)': {
       minHeight: '444px',
   }
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

const InterviewContent = ({content = ''}) => <Content dangerouslySetInnerHTML={{ __html: content }} />;

InterviewContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default InterviewContent;