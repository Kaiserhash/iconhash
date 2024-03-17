import React from 'react';
import {styled} from "frontity";
import PropTypes from "prop-types";
import {theme} from "../../../constants/theme";

const Container = styled('div')({
    borderLeft: `6px solid ${theme.colors.blue}`,
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
    color: theme.colors.blue,
    textDecoration: 'none'
})
const ReadAlsoBlock = ({readAlso: { title = '', page }}) => (
  <Container>
      <Title>{title}</Title>
      <LinkPage link={page?.url} target="_blank">{page?.title}</LinkPage>
  </Container>
);

ReadAlsoBlock.propTypes = {
    readAlso: PropTypes.shape({
        title: PropTypes.string.isRequired,
        page: PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired
}

export default ReadAlsoBlock;
