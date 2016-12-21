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
    var options = items.landing_options;

    // Populate inputs with options
    document.getElementsByName("bgcolor")[0].value = options.bgcolor;
    document.getElementsByName("lncolor")[0].value = options.lncolor;
    document.getElementsByName("lnsize")[0].value = options.lnsize;
    document.getElementsByName("font")[0].value = options.font;
    document.getElementsByName("txcolor")[0].value = options.txcolor;
    document.getElementsByName("txsize")[0].value = options.txsize;
  });
}

function saveOptions() {
  chrome.storage.sync.set({
    landing_options: {
      bgcolor: document.getElementsByName("bgcolor")[0].value,
      lncolor: document.getElementsByName("lncolor")[0].value,
      lnsize: document.getElementsByName("lnsize")[0].value,
      font: document.getElementsByName("font")[0].value,
      txcolor: document.getElementsByName("txcolor")[0].value,
      txsize: document.getElementsByName("txsize")[0].value
    }
  }, function() {});
}

function setToDefaults() {
  chrome.storage.sync.set({
    landing_options: {
      bgcolor: "#ccc",
      lncolor: "#333",
      lnsize: 2,
      font: "sans-serif",
      txcolor: "#333",
      txsize: 20
    }
  }, function() {});
}

