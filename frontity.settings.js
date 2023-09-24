const settings = {
  "name": "iconichash",
  "state": {
    "frontity": {
      "url": process.env.BACKEND_URL,
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
          "url": process.env.BACKEND_URL,
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
    "@frontity/yoast",
    "change-config"
  ]
};

export default settings;
