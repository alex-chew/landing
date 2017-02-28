var optionNames = [
    "bgcolor",
    "lncolor",
    "lnsize",
    "font",
    "txcolor",
    "txsize"
];

function setOptions(options) {
  for (let o of optionNames) {
    document.getElementsByName(o)[0].value = options[o];
  }
}

function getOptions() {
  var options = {};
  for (let o of optionNames) {
    options[o] = document.getElementsByName(o)[0].value;
  }
  return options;
}

document.body.onload = function() {
  chrome.storage.sync.get("landing_options", function(items) {
    if (chrome.runtime.error) {
      console.log("Could not get options from Chrome storage");
      return;
    }

    // If no options exist yet, reset to defaults
    if (!items.landing_options) {
      setToDefaults();
    }

    populateInputs();
  });

  var saveButton = document.getElementsByName("save")[0];
  saveButton.addEventListener("click", saveOptions);

  var resetButton = document.getElementsByName("reset")[0];
  resetButton.addEventListener("click", function() {
    if (window.confirm("Reset to default settings? All current settings will be lost.")) {
      setToDefaults();
      populateInputs();
    }
  });
};

function populateInputs() {
  chrome.storage.sync.get("landing_options", function(items) {
    setOptions(items.landing_options);
  });
}

function saveOptions() {
  chrome.storage.sync.set({
    landing_options: getOptions()
  }, function() {});
}

function setToDefaults() {
  chrome.storage.sync.set({
    landing_options: {
      bgcolor: "#cccccc",
      lncolor: "#333333",
      lnsize: 2,
      font: "sans-serif",
      txcolor: "#333333",
      txsize: 20
    }
  }, function() {});
}

