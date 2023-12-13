import {connect} from "frontity";
import SocialsMenu from "../../components/SocialsMenu";

const HomePage = ({state}) => {
  const { acf: { footerSocialsMenu = []} } = state.source.get("acf-options-page");
  return (
      <SocialsMenu socials={footerSocialsMenu} />
  )
}

export default connect(HomePage);