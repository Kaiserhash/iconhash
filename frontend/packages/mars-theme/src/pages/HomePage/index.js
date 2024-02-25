import {connect, styled} from "frontity";
import HomeBanner from "../../components/Home/HomeBanner";
import Container from "../../components/Container";
import HomeTitle from "../../components/Home/HomeTitle";
import HomeFilters from "../../components/Home/HomeFilters";
import {theme} from "../../constants/theme";

const MainContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 100%;
  margin-bottom: 33px;
  @media (min-width: ${theme.screens.lg}){
    grid-template-columns: 10fr 2fr;
    margin-bottom: 90px;
  }
`

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 100%;
  justify-content: space-between;
  @media (min-width: ${theme.screens.lg}){
    order: 1;
  }
`

const HomePage = ({state,actions}) => {
  const {
      memberOfTheMonthData ,
      filtersList,
      dataList = [],
      currentPage = 1,
      totalPages = 0,
      totalItems = 0,
  } = state.homePage;
  console.log(dataList)
  return (
      <>
          {memberOfTheMonthData ? <HomeBanner {...memberOfTheMonthData} />:null}
          <Container>
            <HomeTitle totalItems={totalItems} />
            <MainContainer>
                <HomeFilters
                    filtersList={filtersList}
                    actions={actions}
                />
                <ItemsContainer>

                </ItemsContainer>
            </MainContainer>
          </Container>
      </>

  )
}

export default connect(HomePage);