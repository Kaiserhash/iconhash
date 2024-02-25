import PropTypes from "prop-types";
import {styled} from "frontity";
import {theme} from "../../../constants/theme";
import {Badge} from "antd";

const Container = styled.div`
  margin-bottom: 19px;
  display: flex;
  align-items: center;
`

const Title = styled('h2')`
  color: var(--etxt, #24313E);
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  margin-right: 12px;
  @media (min-width: ${theme.screens.lg}) {
    font-size: 32px;
    margin-right: 16px;
  }
`

const CustomBadge = styled(Badge)`
  .ant-badge-count {
    background: var(--Primary-light, rgba(41, 59, 220, 0.06));
    color: var(--Primary, #293BDC);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    box-shadow: none;
  }
`

const HomeTitle = ({totalItems = 0}) => (
  <Container>
     <Title>All interviews</Title>
     <CustomBadge
          count={totalItems}
     />
  </Container>
)

HomeTitle.propTypes = {
    totalItems: PropTypes.number.isRequired
}

export default HomeTitle