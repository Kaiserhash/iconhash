import React from 'react';
import {styled} from "frontity";
import {theme} from "../../constants/theme";

const Wrapper = styled('div')({
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 15px',
    maxWidth: '1212px',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
})
const Container = ({children,...props}) =>(
    <Wrapper {...props}>
        {children}
    </Wrapper>
)

export default Container