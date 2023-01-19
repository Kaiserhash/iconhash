import ShareBlock from "../../components/ShareBlock";
import {connect} from "frontity";

const HomePage = ({state}) => {
  const { acf: { footerSocialsMenu = []} } = state.source.get("acf-options-page");
  return (
      <ShareBlock socials={footerSocialsMenu} />
  )
}

export default connect(HomePage);