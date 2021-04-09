
// get the table
// var tables = document.querySelectorAll("table.sortable");
// var table = tables[0];  // only one table in the document
var table = document.getElementById('table1')

// get the column headers
var thead = table.querySelector("thead");
var headers = thead.querySelectorAll("th");
var numberOfClicks = [];

// assign hyperlinks to each column header, which will sort the current column when clicked
// initialize the number of clicks for each column with 0
for (var index = 0; index < headers.length; index++) {
  headers[index].innerHTML = "<a href='#'>" + headers[index].innerText + "</a>";
  // initialize the number of clicks for each column with 0
  numberOfClicks.push(0);
}

// add event listener for the column headers
thead.addEventListener("click", sortTable(table))



function sortTable(table) {

  return function(ev) {

    if (ev.target.tagName.toLowerCase() == 'a') {
        var columnIndex = siblingIndex(ev.target.parentNode);
        // update the number of clicks for the current column
        numberOfClicks[columnIndex] += 1;
        sortRows(table, columnIndex);
        ev.preventDefault();
    }

  };

}

// function siblingIndex2(parent, child) {
//   return Array.prototype.indexOf.call(parent.children, child);
// }

// gets the index of a node relative to its siblings
// used to compute the index of the current column
function siblingIndex(node) {
  var count = 0;

  while (node = node.previousElementSibling) {
      count++;
  }

  return count;
}

function sortRows(table, columnIndex) {

  var rows = table.querySelectorAll("tbody tr"),
      selector = "thead th:nth-child(" + (columnIndex + 1) + ")",
      selector2 = "td:nth-child(" + (columnIndex + 1) + ")",
      classList = table.querySelector(selector).classList,
      values = [],
      classType = "",
      currentValue,
      index,
      node;

  if (classList.contains("string"))
    classType = "string";
  else
    classType = "number";

  // get the values from columnIndex for every row rows[index]
  for (index = 0; index < rows.length; index++) {
    node = rows[index].querySelector(selector2);
    currentValue = node.innerText;
    values.push({ value: currentValue, row: rows[index] });
  }

  // sort the array according to the class type
  if (classType == "number")
    values.sort(numberComparator);
  else
    values.sort(stringComparator);

  // if there have been an even number of clicks, reverse the array in order to be decreasing
  if (numberOfClicks[columnIndex] % 2 == 0)
    values.reverse();

  // position the rows (only in the current column) in the new order
  for (index = 0; index < values.length; index++) {
    // node = rows[index].querySelector(selector2);
    // node.innerText = values[index].value;

    // table.getElementByTag('tbody').getElementByTagName('tr')[index].getElementByTagName('td')[columnIndex].innerText = values[index].value;
    // table.querySelector("tbody").appendChild(values[index].value);
    // node = rows[index].querySelector(selector2);

    table.querySelector("tbody").appendChild(values[index].row);
  }

}

// compare 2 numbers
function numberComparator(number1, number2)
{
  return number1.value - number2.value;
}

// compare 2 strings
function stringComparator(string1, string2)
{
  var text1 = string1.value.toLowerCase();
  var text2 = string2.value.toLowerCase();

  if(text1 < text2)
    return -1;
  else if (text1 > text2)
    return 1;
  return 0;

}