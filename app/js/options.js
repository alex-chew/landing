document.body.onload = function() {
  chrome.storage.sync.get("landing_prefs", function(items) {
    if (!chrome.runtime.error && items.landing_prefs) {
      var prefs = items.landing_prefs;
      console.log(prefs);

      var schema = {
        "title": "Categories",
        "type": "array",
        "format": "table",
        "items":{
          "type": "object",
          "title": "Category",
          "properties": {
            "name": {"type": "string"},
            "links":{
              "type": "array",
              "format": "table",
              "items": {
                "type": "object",
                "title": "Link",
                "properties": {
                  "name": {"type": "string"},
                  "url": {"type": "string"}
                }
              }
            }
          }
        }
      };

      var edCon = document.getElementsByClassName("editor-container")[0];
      var editor = new JSONEditor(edCon, {
        schema: schema,
        theme: "bootstrap3",
        iconlib: "bootstrap3"
      });
    }
  });
};

