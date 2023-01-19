const settings = {
  "name": "iconichash",
  "state": {
    "frontity": {
      "url": "http://localhost:9123",
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
                ["Blog","/blog"]
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
          "url": "http://localhost:9123",
          "homepage": "/home",
          "postsPage": "/blog"
        },
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/yoast"
  ]
};

export default settings;
