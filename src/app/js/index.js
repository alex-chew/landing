(() => {
  var createDom = function(categories, options) {
    // Create rows with title and links
    var bookmarks = document.getElementById("bookmarks");
    bookmarks.innerHTML = categories.map(category => {
      var items = category.children
        .map(bookmark => `<li class="item">
            <a class="link" href="${bookmark.url}">${bookmark.title}</a>
            </li>`)
        .join("");
      return `<tr class="row">
        <td class="category">${category.title}</td>
        <td><ul class="list line-custom">${items}</ul></td>
        </tr>`;
    }).join("");

    // Add quote
    var quote = document.getElementById("quote");
    quote.innerHTML = options.quote;
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
        .link:hover, .link:focus {color: ${options.txcolorhv}}\n`;

    document.head.appendChild(style);
  };

  document.body.onload = function() {
    Promise.all([Landing.getCategories(), Landing.getOptions()])
      .then(results => {
        setStyles(results[1]);
        createDom(results[0], results[1]);
      });
  };
})();
