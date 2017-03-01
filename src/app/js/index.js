(() => {
  var createDom = function(baseFolder, options) {
    // Populate index page
    chrome.bookmarks.getSubTree(baseFolder.id, function(tree) {
      // Get array of category (folder) nodes
      var categories = tree[0].children;

      // Main container on page (from index.html)
      var container = document.getElementsByClassName("container")[0];

      // Add main table to container
      var content = document.createElement("table");
      content.setAttribute("class", "table text-custom");
      container.appendChild(content);

      // Populate each category row
      categories.forEach(function(cat, idx, arr) {
        // Create table row
        var row = document.createElement("tr");
        row.setAttribute("class", "row");

        // Create cell with category title
        var catCell = document.createElement("td");
        catCell.setAttribute("class", "category");
        catCell.innerHTML = cat.title;

        // Create cell for links, and list to hold the links
        var itemsCell = document.createElement("td");
        var itemsList = document.createElement("ul");
        itemsList.setAttribute("class", "list line-custom");

        // Populate category link lists
        cat.children.forEach(function(bookmark) {
          // Create list item
          var item = document.createElement("li");
          item.setAttribute("class", "item");

          // Create link to place in link
          var link = document.createElement("a");
          link.setAttribute("href", bookmark.url);
          link.setAttribute("class", "link");
          link.innerHTML = bookmark.title;

          // Add link element to item, and add item to list
          item.appendChild(link);
          itemsList.appendChild(item);
        });

        // Add everything to the row, and add the row to the content element
        itemsCell.appendChild(itemsList);
        row.appendChild(catCell);
        row.appendChild(itemsCell);
        content.appendChild(row);
      });

      // Add quote
      var quote = document.createElement("div");
      quote.setAttribute("class", "quote text-custom");
      quote.innerHTML = options.quote;
      container.appendChild(quote);
    });
  };

  var setStyles = function(options) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML += `body {background: ${options.bgcolor};}\n`;
    style.innerHTML +=
      `.line-custom {border-left-color: ${options.lncolor};
        border-left-width: ${options.lnsize}px;}\n`;
    style.innerHTML +=
      `.text-custom {color: ${options.txcolor};
        font-family: ${options.font};
        font-size: ${options.txsize}px;}\n
        .text-custom .item:hover {color: ${options.txcolorhv}}\n`;

    document.head.appendChild(style);
  };

  document.body.onload = function() {
    Promise.all([Landing.getBaseFolder(), Landing.getOptions()])
      .then(results => {
        setStyles(results[1]);
        createDom(results[0], results[1]);
      });
  };
})();
