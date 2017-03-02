(() => {
  var setOptionValues = function(options) {
    for (var o in options) {
      var input = document.getElementsByName(o)[0];
      if (input.type == "checkbox") input.checked = options[o];
      else input.value = options[o];
    }
  };

  var getOptionValues = function(options) {
    for (var o in options) {
      var input = document.getElementsByName(o)[0];
      if (input.type == "checkbox") options[o] = input.checked;
      else options[o] = input.value;
    }
    return options;
  };

  document.body.onload = function() {
    var options = {};
    Landing.getOptions().then(o => {
      options = o;
      setOptionValues(options);
    });

    var saveButton = document.getElementsByName("save")[0];
    saveButton.addEventListener("click", () => {
      chrome.storage.sync.set({
        landing_options: getOptionValues(options)
      });
    });

    var resetButton = document.getElementsByName("reset")[0];
    resetButton.addEventListener("click", () => {
      if (chrome.extension.getBackgroundPage()
          .confirm("Reset to default settings? This cannot be undone.")) {
      options = Landing.sampleOptions();
      setOptionValues(options);
      }
    });
  };
})();
