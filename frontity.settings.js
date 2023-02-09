const settings = {
  "name": "iconichash",
  "state": {
    "frontity": {
      "url": "https://iconichash.com",
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
                ["Home","/"],
                ["Blog","/blog"],
                ["Interviews","/interviews"]
            ],
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://iconichash.com",
          "homepage": "/home",
          "postsPage": "/blog",
          "postTypes": [
            {
              type: "interview",
              endpoint: "interview",
              archive: "/interviews"
            }
          ]
        },
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/yoast"
  ]
};

export default settings;
