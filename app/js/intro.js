function setColors() {
  chrome.storage.sync.get("landing_options", function(items) {
    var options = items.landing_options;

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML += `body {background: ${options.bgcolor};}\n`;
    style.innerHTML +=
        `body, .intro__link {color: ${options.txcolor};
        font-size: ${options.txsize}px;}\n`;

    document.head.appendChild(style);
  });
}

document.body.onload = function() {
  setColors();
};

