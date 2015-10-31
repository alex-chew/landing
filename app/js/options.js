document.body.onload = function() {
  chrome.storage.sync.get("landing_prefs", function(items) {
    if (!chrome.runtime.error && items.landing_prefs) {
      var prefs = items.landing_prefs;

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
        startval: prefs.categories,
        disable_collapse: true,
        required_by_default: true,
        theme: "bootstrap3",
        iconlib: "bootstrap3"
      });

      var saveButton = document.getElementsByClassName("editor-save")[0];
      saveButton.onclick = function() {
        var errors = editor.validate();
        if (errors.length) {
          alert("Validation errors! See console for details.");
          console.log(errors);
        } else {
          chrome.storage.sync.set({
            "landing_prefs": {categories: editor.getValue()}
          }, function() {
            if (chrome.runtime.error) {
              console.log("Runtime error");
            }
          });
        }
      };
    }
  });
};

