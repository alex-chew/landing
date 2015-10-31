document.body.onload = function() {
  chrome.storage.sync.get("landing_prefs", function(items) {
    if (!chrome.runtime.error && items.landing_prefs) {
      var categories = items.landing_prefs.categories;
      console.log(categories);

      var content = document.getElementsByClassName("list")[0];
      for (var cat in categories) {
        var catEl = document.createElement("ul");
        catEl.setAttribute("class", "list__category");
        catEl.innerHTML = cat;

        for (var ln in categories[cat]) {
          var lnItemEl = document.createElement("li");
          lnItemEl.setAttribute("class", "list__item");

          var lnEl = document.createElement("a");
          lnEl.setAttribute("href", "http://" + categories[cat][ln]);
          lnEl.setAttribute("class", "list__link");
          lnEl.innerHTML = ln;

          lnItemEl.appendChild(lnEl);
          catEl.appendChild(lnItemEl);
        }

        content.appendChild(catEl);
      }
    }
  });
}

