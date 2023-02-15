import React, { useMemo,useState } from "react";
import {styled} from "frontity";
import {LazyLoadImage} from "react-lazy-load-image-component/src";
import PropTypes from "prop-types";

const Container = styled('div')({
    padding: '30px 0'
});

const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px'
});

const Title = styled('h2')({
    color: '#24313E',
    fontWeight: 700,
    fontSize: '22px',
    marginRight: '15px',
    '@media (min-width: 990px)': {
        fontSize: '32px'
    }
});

const CountImages = styled('span')({
    padding: '4px 12px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 700,
    background: 'rgba(41, 59, 220, 0.06)',
    borderRadius: '8px',
    color: '#293BDC'
});

const GalleryContainer = styled('div')({
    display: 'grid',
    gridGap: '8px',
    gridTemplateColumns: '100%',
    marginBottom: '25px',
    '@media (min-width: 990px)': {
        gridGap: '34px',
        gridTemplateColumns: 'repeat(3,1fr)'
    }
});

const Image = styled(LazyLoadImage)({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '12px'
});

const LoadMoreButton = styled('button')({
    backgroundColor: '#fff',
    border: '1px solid #E6EAEE',
    borderRadius: '76px',
    padding: '11px',
    textAlign: 'center',
    width: '100%',
    display: 'block',
    cursor: 'pointer',
    '@media (min-width: 990px)': {
        width: '196px'
    }
});

const InterviewGallery = ({galleryTitle = '',galleryImages = [], loadMore = ''}) => {
    const [perPage, setPerPage] = useState(6);
    const [gallery,setGallery] = useState([]);
    useState(() => {
        setGallery(galleryImages.slice(0,perPage));
        return () => {
            setGallery([]);
            setPerPage(6);
        }
    },[]);
    const totalImages = useMemo(() => galleryImages.length,[galleryImages]);
    const loadMoreHandler = () => {
       const calcPerPage = perPage + 6;
       setPerPage(calcPerPage);
       setGallery([
           ...gallery,
           ...galleryImages.slice(gallery.length,calcPerPage)
       ]);
    };
    const showButton = useMemo(() => perPage < galleryImages.length,[perPage]);
    return (
         <Container>
             <FlexContainer>
                 <Title>{galleryTitle}</Title>
                 <CountImages>{totalImages}</CountImages>
             </FlexContainer>
             <GalleryContainer>
                 {
                     gallery.map(({ url,title = 'image',width = 100,height = 100 },index) => (
                         <Image key={index} src={url} alt={title} width={100} height={100}  />
                     ))
                 }
             </GalleryContainer>
             {showButton ? <LoadMoreButton type="button" onClick={() => loadMoreHandler()}>{loadMore}</LoadMoreButton>: null}
         </Container>
    )
};

InterviewGallery.propTypes = {
    galleryTitle: PropTypes.string.isRequired,
    loadMore: PropTypes.string.isRequired,
    galleryImages: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired).isRequired
};

export default InterviewGallery;