import React from "react";
import {styled} from "frontity";
import Link from "@frontity/components/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0'
})

const ButtonLink = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    textDecoration: 'none',
    color: '#24313E'
})

const InterviewNavigation = ({prevUrl,nextUrl}) => {
    return (
       <Container>
           <ButtonLink link={prevUrl}>
               <FontAwesomeIcon icon="fa-solid fa-angle-left" css={{marginRight: '12px'}} />
               <span>Previous</span>
           </ButtonLink>
           <ButtonLink link={nextUrl}>
               <span>Next</span>
               <FontAwesomeIcon icon="fa-solid fa-angle-right" css={{marginLeft: '12px'}} />
           </ButtonLink>
       </Container>
    )
}

InterviewNavigation.propTypes = {
    prevUrl: PropTypes.string,
    nextUrl: PropTypes.string,
}

export default InterviewNavigation;