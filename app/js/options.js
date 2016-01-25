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

    populateInputs(items.landing_options);
  });

  var saveButton = document.getElementsByName("save")[0];
  saveButton.addEventListener("click", saveOptions);
};

function populateInputs(options) {
  chrome.storage.sync.get("landing_options", function(items) {
    // Populate inputs with options
    document.getElementsByName("bgcolor")[0].value = options.bgcolor;
    document.getElementsByName("lncolor")[0].value = options.lncolor;
    document.getElementsByName("txcolor")[0].value = options.txcolor;
  });
}

function saveOptions() {
  chrome.storage.sync.set({
    landing_options: {
      bgcolor: document.getElementsByName("bgcolor")[0].value,
      lncolor: document.getElementsByName("lncolor")[0].value,
      txcolor: document.getElementsByName("txcolor")[0].value
    }
  }, function() {});
}

function setToDefaults() {
  console.log("Setting defaults");
  chrome.storage.sync.set({
    landing_options: {
      bgcolor: "#2b303b", // navy blue
      lncolor: "#4f5b66", // light navy
      txcolor: "#eff1f5" // bright bluish white
    }
  }, function() {});
}

