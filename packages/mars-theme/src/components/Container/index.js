import React from 'react';
import {styled} from "frontity";

const Wrapper = styled('div')({
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 15px',
    maxWidth: '1212px',
    width: '100%'
})
const Container = ({children}) =>(
    <Wrapper className="container">
        {children}
    </Wrapper>
)

export default Container