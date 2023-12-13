import {Global, css, connect,  styled} from "frontity";
import Switch from "@frontity/components/switch";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InterviewPage from "./pages/InterviewPage";
/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */
const Main = styled('main')({
    backgroundColor: '#E8EBF9'
})
const App = ({ state }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    console.log(data)
    return (
        <>
            <Global styles={globalStyles} />
            <Header />
            <Main>
                <Switch>
                    <HomePage when={data.isHome} />
                    <InterviewPage when={data.isInterviews} data={data} />
                </Switch>
            </Main>
            <Footer />
        </>
    );
};

export default connect(App);

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
  * {
    padding: 0;
    margin: 0;
  }
  #root {
    font-weight: 500;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    color: #24313E;
  }
  @media (min-width: 990px){
    #root {
      font-size: 16px;
    }
  }
`;