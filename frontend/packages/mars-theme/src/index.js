import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import App from "./App";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'

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

const getGirlOfTheMonthHandler = {
  pattern: "get-girl-of-the-month",
  func: async ({route,state,libraries}) => {
    try {
      const query = [
        {
          key: 'authorAbout_memberOfTheMonth',
          value: 1,
        }
      ];
      const response = await libraries.source.api.get({
        endpoint: "interviews",
        params: {
          per_page: 1,
          _embed: true,
          ...Object.assign({},...query.flatMap((item,index) => Object.entries(item).flatMap(([key,value]) => ({
              [`acf_fields[${index}][${key}]`]: value
           }))))
        },
      });
      const getData = await response.json();
      state.homePage.memberOfTheMonthData = getData[0];
    } catch (e) {
      console.error(e);
    }
  }
}

const getInterviewsFiltersHandler = {
  pattern: "get-interviews-filters",
  func: async ({route,state,libraries}) => {
    try {
      const response = await libraries.source.api.get({
        endpoint: "interviews-filters",
      });
      const getData = await response.json();
      state.homePage.filtersList = {
        ...getData,
        ...(getData?.weight && {
          weight: [
            Math.min(...getData?.weight.filter(val => !isNaN(val))),
            Math.max(...getData?.weight.filter(val => !isNaN(val)))
          ]}),
        ...(getData?.height && {
          height: [
            Math.min(...getData?.height.filter(val => !isNaN(val))),
            Math.max(...getData?.height.filter(val => !isNaN(val)))
          ]
        })
      };
    } catch (e) {
      console.error(e);
    }
  }
}

const getPaginatedInterviewsHandler = {
  pattern: "get-paginated-interviews",
  func: async ({state,libraries}) => {
    try {
      const getFilters = Object.entries(state.homePage.filters).reduce((a,[name,value]) => {
        if(value.length) {
          if(['personalChar_weight','personalChar_height'].includes(name)) {
            if(value[0] && value[1]) {
              a.push({
                key: `authorInfo_${name}`,
                value: value.join(','),
                compare: 'BETWEEN',
                type: 'NUMERIC'
              });
            }
          } else {
            a.push({
              key: `authorInfo_${name}`,
              value: value.join(','),
              compare: 'IN'
            });
          }
        }
        return a;
      },[]);
      const response = await libraries.source.api.get({
        endpoint: "paginated-interviews",
        params: {
          per_page: state.homePage.perPage,
          page: state.homePage.currentPage,
          _embed: true,
          ...(getFilters.length && {
            ...Object.assign({},...getFilters.flatMap((item,index) => Object.entries(item).flatMap(([key,value]) => ({
              [`acf_fields[${index}][${key}]`]: value
            }))))
          })
        },
      });
      const { dataList = [],totalPages = 0, totalItems = 0 } = await response.json();
      state.homePage.dataList = dataList;
      state.homePage.totalPages = totalPages;
      state.homePage.totalItems = totalItems;
    } catch (e) {
      console.error(e);
    }
  }
}

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
    homePage: {
      memberOfTheMonthData: null,
      dataList: [],
      perPage: 3,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      filtersList: {},
      filters: {
        infoBlock_country: [],
        infoBlock_city: [],
        infoBlock_profession: [],
        personalChar_hairsColor: [],
        personalChar_eyesColor: [],
        personalChar_weight: [0,0],
        personalChar_height: [0,0],
      }
    }
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR: async ({  actions, state }) => {
        try {
          await actions.source.fetch("acf-options-page");
          if(state.router.link === '/') {
            await actions.source.fetch("get-girl-of-the-month");
            await actions.source.fetch("get-interviews-filters");
            await actions.source.fetch("get-paginated-interviews");
          }

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
    homePage: {
      onChangePage: ({state,actions}) => async (currentPage = 1) => {
        state.homePage.currentPage = currentPage;
        await actions.source.fetch("get-paginated-interviews", { force: true });
      },
      acceptFilters: ({state,actions}) => async ({
                                                    countryFilters = [],
                                                    citiesFilters = [],
                                                    professionsFilters = [],
                                                    hairsFilters = [],
                                                    eyesFilters = [],
                                                    weightFilters = [0,0],
                                                    heightFilters = [0,0]
                                                   }) => {
        state.homePage.currentPage = 1;
        state.homePage.filters.infoBlock_country = countryFilters;
        state.homePage.filters.infoBlock_city = citiesFilters;
        state.homePage.filters.infoBlock_profession = professionsFilters;
        state.homePage.filters.personalChar_eyesColor = eyesFilters;
        state.homePage.filters.personalChar_hairsColor = hairsFilters;
        state.homePage.filters.personalChar_weight = weightFilters;
        state.homePage.filters.personalChar_height = heightFilters;
        await actions.source.fetch("get-paginated-interviews", { force: true });
      },
      resetFilters: ({ state, actions }) => async () => {
        state.homePage.currentPage = 1;
        state.homePage.filters.infoBlock_country = [];
        state.homePage.filters.infoBlock_city = [];
        state.homePage.filters.infoBlock_profession = [];
        state.homePage.filters.personalChar_hairsColor = [];
        state.homePage.filters.personalChar_eyesColor = [];
        state.homePage.filters.personalChar_weight= [0,0];
        state.homePage.filters.personalChar_height = [0,0];
        await actions.source.fetch("get-paginated-interviews", { force: true });
      }
    }
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
      handlers: [acfOptionsHandler,getGirlOfTheMonthHandler,getInterviewsFiltersHandler,getPaginatedInterviewsHandler]
    }
  },
};

export default marsTheme;
