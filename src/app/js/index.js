function createDom(baseFolder) {
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
  });
}

function setColors() {
  chrome.storage.sync.get("landing_options", function(items) {
    var options = items.landing_options || {};
    var bgcolor = options.bgcolor || "#ccc";
    var lncolor = options.lncolor || "#333";
    var lnsize = options.lnsize || "2";
    var txcolor = options.txcolor || "#333";
    var font = options.font || "sans-serif";
    var txsize = options.txsize || "20";

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML += `body {background: ${bgcolor};}\n`;
    style.innerHTML +=
        `.line-custom {border-left-color: ${lncolor};
        border-left-width: ${lnsize}px;}\n`;
    style.innerHTML +=
        `.text-custom {color: ${txcolor};
        font-family: ${font};
        font-size: ${txsize}px;}\n`;

    document.head.appendChild(style);
  });
}

document.body.onload = function() {
  chrome.bookmarks.get("2", function(nodes) { // id "2" is "Other bookmarks"
    var baseFolder;
    var pageSetup = function() {
      setColors();
      createDom(baseFolder);
    };

    // Iterate over "Other bookmarks" to find base folder
    chrome.bookmarks.getChildren(nodes[0].id, function(nodes) {
      baseFolder = nodes.find(node => node.title == "landing");
      if (baseFolder) {
        pageSetup();
        return;
      }

      // Create sample bookmarks in a very messy way
      chrome.bookmarks.create({
        parentId: "2",
        title: "landing"
      }, function(base) {
        // Set baseFolder for pageSetup
        baseFolder = base;
        chrome.bookmarks.create({
          parentId: base.id,
          title: "Welcome!"
        }, function(welcome) {
          chrome.bookmarks.create({
            parentId: welcome.id,
            title: "Add bookmarks to the \"landing\" folder to get started.",
            url: "chrome://bookmarks"
          }, pageSetup);
        });
      });
    });
  });
};
