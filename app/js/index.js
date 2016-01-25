function createIndex(baseFolder) {
  if (!baseFolder) {
    console.log("Base folder not found");
    return;
  }

  // Populate index page
  chrome.bookmarks.getSubTree(baseFolder.id, function(tree) {
    // Get array of category (folder) nodes
    var categories = tree[0].children;

    // Main list element on page (from index.html)
    var content = document.getElementsByClassName("list")[0];

    // Populate each category row
    categories.forEach(function(cat, idx, arr) {
      // Create table row
      var row = document.createElement("tr");
      row.setAttribute("class", "list__row");

      // Create cell with category title
      var catCell = document.createElement("td");
      catCell.setAttribute("class", "list__category");
      catCell.innerHTML = cat.title;

      // Create cell for links, and list to hold the links
      var itemsCell = document.createElement("td");
      itemsCell.setAttribute("class", "list__items");
      var itemsList = document.createElement("ul");
      itemsList.setAttribute("class", "list__items-list");

      // Populate category link lists
      cat.children.forEach(function(bookmark) {
        // Create list item
        var item = document.createElement("li");
        item.setAttribute("class", "list__items-list__item");

        // Create link to place in link
        var link = document.createElement("a");
        link.setAttribute("href", bookmark.url);
        link.setAttribute("class", "list__items-list__link");
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

document.body.onload = function() {
  chrome.bookmarks.get("2", function(nodes) { // id "2" is "Other bookmarks"
    var baseFolder;

    // Iterate over "Other bookmarks" to find base folder
    chrome.bookmarks.getChildren(nodes[0].id, function(nodes) {
      baseFolder = nodes.find(function(node, idx, arr) {
        return node.title == "landing";
      });

      createIndex(baseFolder);
    });
  });
};

