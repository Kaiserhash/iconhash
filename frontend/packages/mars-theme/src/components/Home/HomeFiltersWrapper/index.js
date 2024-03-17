import React, { useMemo } from 'react';
import {Badge, Collapse} from "antd";
import {theme} from "../../../constants/theme";
import {styled} from "frontity";
import arrowDown from '../../../../static/arrow.svg';
import filterIcon from '../../../../static/filter.svg';
import {LazyLoadImage , trackWindowScroll} from "react-lazy-load-image-component";

const CustomCollapse = styled(Collapse)`
  padding: 18px 13px;
  border-radius: 13px;
  background: var(--White, #FFF);
  box-shadow: 0px 4px 17px 0px rgba(197, 203, 235, 0.09);
  .ant-collapse-header,.ant-collapse-content-box {
    padding: 0 !important;
  }
  .ant-collapse-content-box {
    margin-top: 28px;
  }
  @media (min-width: ${theme.screens.lg}) {
    padding: 20px 19px;
    order: 2;
    height: max-content;
    .ant-collapse-header {
      cursor: inherit !important;
    }
    .ant-collapse-content-box {
      margin-top: 16px;
    }
  }
`


const Header = styled.div`
  display: grid;
  grid-template-columns: 20px max-content max-content;
  align-items: center;
  grid-gap: 12px;
`

const FilterIcon = styled(LazyLoadImage)`
  width: 20px !important;
  height: 20px;
  @media (min-width: ${theme.screens.lg}) {
    display: none;
  }
`

const FilterTitle = styled.span`
  color: ${theme.colors.black};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  @media (min-width: ${theme.screens.lg}) {
    font-size: 20px;
  }
`

const CustomBadge = styled(Badge)`
  background: var(--Primary-light, rgba(41, 59, 220, 0.06));
  color: ${theme.colors.blue};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  box-shadow: none;
  padding: 4px 12px;
  border-radius: 8px;
  @media (min-width: ${theme.screens.lg}) {
    display: none;
  }
`

const HomeFiltersWrapper = ({children,totalAcceptedFilters = 0,isMobile = false,scrollPosition}) => {
    const items = useMemo(() => [
        {
            key: '1',
            label: (
                <Header>
                    <FilterIcon scrollPosition={scrollPosition} width={20} height={20} src={filterIcon} alt="filter" />
                    <FilterTitle>Filters</FilterTitle>
                    <CustomBadge>Applied: {totalAcceptedFilters}</CustomBadge>
                </Header>
            ),
            children,
            showArrow: isMobile,
            collapsible: isMobile ? 'header': 'disabled'
    }],[isMobile,totalAcceptedFilters]);
    return (
        <CustomCollapse defaultActiveKey={['1']} expandIcon={() => <LazyLoadImage src={arrowDown}  alt="arrow" />}  ghost items={items} expandIconPosition="end"  />
    )
}



export default trackWindowScroll(HomeFiltersWrapper);