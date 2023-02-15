import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import App from "./App";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas);

const acfOptionsHandler = {
  pattern: "acf-options-page",
  func: async ({ route, state, libraries }) => {
    try {
      // 1. Get ACF option page from REST API.
      const response = await libraries.source.api.get({
        endpoint: `/acf/v3/options/options`
      });
      const option = await response.json();
      // 2. Add data to `source`.
      const data = state.source.get(route);
      Object.assign(data, { ...option, isAcfOptionsPage: true });
    } catch (e) {
      console.error(e);
    }
  }
};

// const interviewNavigationHandler = {
//   pattern: "interview-navigation",
//   func: async ({ route, state, libraries }) => {
//     try {
//       // 1. Get ACF option page from REST API.
//       const response = await libraries.source.api.get({
//         endpoint: "interview",
//         params: { _embed: true, }
//       });
//       const getAllInterviews = await response.json();
//       const [interviewId] = Object.keys(state.source.interview);
//       if(interviewId){
//         const getIndex = getAllInterviews.findIndex(({id}) => id === +interviewId);
//         if(getIndex !== -1){
//           const data = state.source.get(route);
//           Object.assign(data, {
//             interviewNav: {
//               prevUrl: getIndex > 0 ? `/interview/${getAllInterviews[getIndex - 1]?.slug}`: '/',
//               nextUrl: getIndex + 1 < getAllInterviews.length ? `/interview/${getAllInterviews[getIndex + 1]?.slug}`: '/',
//             }
//           });
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
// };

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: App,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR: async ({  actions }) => {
        try {
          await actions.source.fetch("acf-options-page");
          // if(/^(\/interview\/)/g.test(state.router.link)){
          //   await actions.source.fetch("interview-navigation");
          // }
        } catch (e) {
          console.error(e);
        }
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
    source: {
      handlers: [acfOptionsHandler]
    }
  },
};

export default marsTheme;
