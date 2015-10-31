document.body.onload = function() {
  chrome.storage.sync.get("landing_prefs", function(items) {
    if (!chrome.runtime.error && items.landing_prefs) {
      var categories = items.landing_prefs.categories;
      console.log(categories);

      var content = document.getElementsByClassName("list")[0];
      for (var cat in categories) {
        var row = document.createElement("tr");
        row.setAttribute("class", "list__row");

        var catCell = document.createElement("td");
        catCell.setAttribute("class", "list__category");
        catCell.innerHTML = cat;

        var itemsCell = document.createElement("td");
        itemsCell.setAttribute("class", "list__items");

        var itemsList = document.createElement("ul");
        itemsList.setAttribute("class", "list__items-list");

        for (var ln in categories[cat]) {
          var item = document.createElement("li");
          item .setAttribute("class", "list__items-list__item");

          var link = document.createElement("a");
          link.setAttribute("href", "http://" + categories[cat][ln]);
          link.setAttribute("class", "list__items-list__link");
          link.innerHTML = ln;

          item.appendChild(link);
          itemsList.appendChild(item);
        }

        itemsCell.appendChild(itemsList);

        row.appendChild(catCell);
        row.appendChild(itemsCell);
        content.appendChild(row);
      }
    }
  });
}

