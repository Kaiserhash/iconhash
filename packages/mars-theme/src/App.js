import {Global, css, connect, Head, styled} from "frontity";
import Switch from "@frontity/components/switch";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Container from "./components/Container";
import Footer from "./components/Footer";
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
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100&display=swap"
                            rel="stylesheet"/>
            </Head>
            <Global styles={globalStyles} />
            <Header />
            <Main>
                <Container>
                    <Switch>
                        <HomePage when={data.isHome} />
                    </Switch>
                </Container>
            </Main>
            <Footer />
        </>
    );
};

export default connect(App);

const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
  }
  #root {
    font-weight: 500;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    color: #24313E;
  }
`;