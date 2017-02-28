(() => {
  var setOptionValues = function(options) {
    for (var o in options) {
      document.getElementsByName(o)[0].value = options[o];
    }
  };

  var getOptionValues = function(options) {
    for (var o in options) {
      options[o] = document.getElementsByName(o)[0].value;
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
      // if (window.confirm("Reset to default settings? All current settings will be lost.")) {
      options = Landing.sampleOptions();
      setOptionValues(options);
      // }
    });
  };
})();
