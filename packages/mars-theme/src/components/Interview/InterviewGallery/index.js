import React, { useMemo,useState,useEffect } from "react";
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

const InterviewGallery = ({gallery: { list = [],title }}) => {
    const [perPage, setPerPage] = useState(6);
    const [galleryImages,setGalleryImages] = useState([]);
    useEffect(() => {
        setGalleryImages(list.slice(0,perPage));
        return () => {
            setGalleryImages([]);
            setPerPage(6);
        }
    },[galleryImages]);
    const totalImages = useMemo(() => galleryImages.length,[galleryImages]);
    const loadMoreHandler = () => {
       const calcPerPage = perPage + 6;
       setPerPage(calcPerPage);
       setGalleryImages([
           ...list,
           ...list.slice(galleryImages.length,calcPerPage)
       ]);
    };
    const showButton = useMemo(() => perPage < list.length,[perPage]);
    return (
         <Container>
             <FlexContainer>
                 <Title>{title}</Title>
                 <CountImages>{totalImages}</CountImages>
             </FlexContainer>
             <GalleryContainer>
                 {
                     galleryImages.map(({ img: { ID = 0,url,title = 'image',width = 100,height = 100 } },index) => (
                         <Image key={ID} src={url} alt={title} width={width} height={height}  />
                     ))
                 }
             </GalleryContainer>
             {showButton ? <LoadMoreButton type="button" onClick={() => loadMoreHandler()}>Show more</LoadMoreButton>: null}
         </Container>
    )
};

InterviewGallery.propTypes = {
    gallery: PropTypes.shape({
        title: PropTypes.string.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired).isRequired
    }).isRequired
};

export default InterviewGallery;