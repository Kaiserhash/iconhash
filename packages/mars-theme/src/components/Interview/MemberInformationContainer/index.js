import React, { useEffect, useState } from "react";
import {Collapse} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {styled} from "frontity";
const { Panel } = Collapse;
const CollapsePanel = styled(Panel)({
    '& .ant-collapse-expand-icon': {
        order: '3 !important'
    },
    '& .ant-collapse-header-text': {
        order: '2 !important'
    },
    '& .ant-collapse-extra': {
        order: '1 !important',
        marginRight: '5px'
    }
})
const MemberInformationContainer = (Component) => (props) => {
    const [isMobile, setIsMobile] = useState(false);

    function handleWindowSizeChange() {
        setIsMobile(window.outerWidth < 990);
    }
    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    return isMobile ? (
        <Collapse
            defaultActiveKey={['1']}
            expandIconPosition="end"
            css={{marginBottom: '15px'}}
        >
            <CollapsePanel header={props.infoTitle} key="1" extra={<InfoCircleOutlined />}>
                <Component {...props}  />
            </CollapsePanel>
        </Collapse>
    ):(
     <>
         <Component {...props} />
     </>
    );
}

export default MemberInformationContainer;