import {connect, styled} from "frontity";
import HomeBanner from "../../components/Home/HomeBanner";
import Container from "../../components/Container";
import HomeTitle from "../../components/Home/HomeTitle";
import HomeFilters from "../../components/Home/HomeFilters";
import {theme} from "../../constants/theme";
import HomeInterview from "../../components/Home/HomeInterview";
import {Pagination} from "antd";
import useMobileHook from "../../hooks/useMobileHook";

const MainContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 100%;
  margin-bottom: 33px;
  @media (min-width: ${theme.screens.lg}){
    grid-template-columns: 2fr 1fr;
    margin-bottom: 90px;
  }
`

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  justify-content: space-between;
  @media (min-width: ${theme.screens.lg}){
    order: 1;
  }
`
const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 12px;
  margin-bottom: 17px;
  @media (min-width: ${theme.screens.lg}){
    grid-gap: 18px;
    margin-bottom: 43px;
  }
`;

const CustomPagination = styled(Pagination)`
  & .ant-pagination-prev,.ant-pagination-next {
    height: 40px !important;
  }
  & .ant-pagination-item-link {
    width: 40px !important;
    height: 40px !important;
    border-radius: 11px !important;
    background: #FFF !important;
    box-shadow: 0px 4px 17px 0px rgba(197, 203, 235, 0.09) !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 0px 4px 14px 0px rgba(66, 113, 157, 0.26) !important;
      & svg {
        fill: var(--Primary, #293BDC);
      }
    }
  }
  & .ant-pagination li {
    margin-right: 4px;
  }
  & .ant-pagination-item{
    border-radius: 11px !important;
    border: 1px solid #EEF0F9 !important;
    background: #FFF !important;
    box-shadow: 0px 4px 17px 0px rgba(197, 203, 235, 0.09) !important;
    width: 40px !important;
    height: 40px !important;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    & a{
      padding: 0 !important;
      color: ${theme.colors.black};
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
    }
    &:hover {
      box-shadow: 0px 4px 14px 0px rgba(66, 113, 157, 0.26) !important;
      & a{
        color: var(--Primary, #293BDC);
      }
    }
    &.ant-pagination-item-active {
      background: ${theme.colors.black} !important;
      & a {
        color: #fff;
      }
    }
  }
`;

const HomePage = ({state,actions}) => {
  const {
      memberOfTheMonthData ,
      filtersList,
      dataList = [],
      currentPage = 1,
      totalItems = 0,
  } = state.homePage;
  const isMobile = useMobileHook();
  return (
      <>
          {memberOfTheMonthData ? <HomeBanner {...memberOfTheMonthData} />:null}
          <Container>
            <HomeTitle totalItems={totalItems} />
            <MainContainer>
                <HomeFilters
                    isMobile={isMobile}
                    filtersList={filtersList}
                    actions={actions}
                />
                <DataContainer>
                    <ItemsContainer>
                        {
                            dataList.map(({id,...data}) => (
                                <HomeInterview isMobile={isMobile} key={id} {...data} />
                            ))
                        }
                    </ItemsContainer>
                    <CustomPagination responsive current={currentPage} onChange={page => actions.homePage.onChangePage(page)} pageSize={3} total={totalItems} />
                </DataContainer>
            </MainContainer>
          </Container>
      </>

  )
}

export default connect(HomePage);