import React from "react";
import {styled} from "frontity";
import SocialsMenu from "../SocialsMenu";
import PropTypes from "prop-types";

const ShareContainer = styled('div')({
    margin: '25px 0',
    padding: '20px',
    backgroundColor: 'rgba(41, 59, 220, 0.06)',
    borderRadius: '15px',
    maxWidth: '773px',
    '& .social-menu': {
        justifyContent: 'center'
    },
    '& .social-menu__item a': {
        backgroundColor: '#fff',
        color: '#293BDC'
    },
    '@media (min-width: 990px)': {
        padding: '28px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .social-menu': {
            justifyContent: 'end'
        },
    }
})

const ShareSubTitle = styled('h5')({
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '4px 8px',
    textAlign: 'center',
    fontSize: '#293BDC',
    fontWeight: 700,
    marginBottom: '7px',
    color: '#293BDC',
    width: 'max-content',
    backgroundColor: 'rgba(41, 59, 220, 0.06)',
    borderRadius: '8px',
    '@media (min-width: 990px)': {
        marginLeft: 0,
        marginRight: 0
    }
})

const ShareTitle = styled('h4')({
    textAlign: 'center',
    marginBottom: '9px',
    fontSize: '22px',
    fontWeight: 700,
    '@media (min-width: 990px)': {
        fontSize: '26px',
        textAlign: 'left'
    }
})

const ShareBlock = ({socialsBlock: { socials = [], subtitle = 'Dou you like this interview?', title = 'Share with friends' }}) => {
   return (
     <ShareContainer>
         <div>
             <ShareSubTitle>{subtitle}</ShareSubTitle>
             <ShareTitle>{title}</ShareTitle>
         </div>
        <SocialsMenu socials={socials} />
     </ShareContainer>
   )
}

ShareBlock.propTypes = {
    socialsBlock: PropTypes.shape({
        socials: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired
            }).isRequired
        ).isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
    }).isRequired

}

export default ShareBlock;