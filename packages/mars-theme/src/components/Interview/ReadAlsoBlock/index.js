import React from 'react';
import {styled} from "frontity";
import PropTypes from "prop-types";

const Container = styled('div')({
    borderLeft: '6px solid #293BDC',
    paddingLeft: '15px',
    fontWeight: 600,
    marginBottom: '15px'
});
const Title = styled('div')({
    display: 'inline-block',
    color: '#1C252F',
    marginRight: '10px'
});
const LinkPage = styled('a')({
    display: 'inline-block',
    color: '#293BDC',
    textDecoration: 'none'
})
const ReadAlsoBlock = ({title = '', page}) => (
  <Container>
      <Title>{title}</Title>
      <LinkPage href={page.url} target="_blank">{page.title}</LinkPage>
  </Container>
);

ReadAlsoBlock.propTypes = {
    title: PropTypes.string.isRequired,
    page: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired
}

export default ReadAlsoBlock;
