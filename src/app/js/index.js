var defaultOptions = {
  bgcolor: "#cccccc",
  lncolor: "#333333",
  lnsize: 2,
  font: "sans-serif",
  txcolor: "#333333",
  txsize: 20
};

function createDom(baseFolder, options) {
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

function setStyles(options) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML += `body {background: ${options.bgcolor};}\n`;
  style.innerHTML +=
    `.line-custom {border-left-color: ${options.lncolor};
      border-left-width: ${options.lnsize}px;}\n`;
  style.innerHTML +=
    `.text-custom {color: ${options.txcolor};
      font-family: ${options.font};
      font-size: ${options.txsize}px;}\n`;

  document.head.appendChild(style);
}

async function getBaseFolder() {
  var bookmarks = await (new Promise(resolve => {
    chrome.bookmarks.getChildren("2", resolve);
  }));

  return bookmarks.find(node => node.title == "landing") ||
    sampleBaseFolder();
}

async function getOptions() {
  var options = await (new Promise(resolve => {
    chrome.storage.sync.get("landing_options", resolve);
  }));

  return options.landing_options || sampleOptions();
}

async function sampleBaseFolder() {
  var landing = await (new Promise(resolve => {
    chrome.bookmarks.create({parentId: "2", title: "landing"}, resolve);
  }));

  var welcome = await (new Promise(resolve => {
    chrome.bookmarks.create({
      parentId: landing.id,
      title: "Welcome!"
    }, resolve);
  }));

  var instructions = await (new Promise(resolve => {
    chrome.bookmarks.create({
      parentId: welcome.id,
      title: "Click here for instructions on how to get started.",
      url: "https://github.com/alex-chew/landing#usage"
    }, resolve);
  }));

  return landing;
}

function sampleOptions() {
  chrome.storage.sync.set({
    landing_options: defaultOptions
  });
  return defaultOptions;
}

document.body.onload = async function() {
  Promise.all([getBaseFolder(), getOptions()]).then(results => {
    setStyles(results[1]);
    createDom(results[0], results[1]);
  });
};

