
$(document).ready(function()
{
    var table = $('#table1');
    var tbody = $("#tbody");

    var numberOfClicks = new Array(0, 0, 0, 0);

    // click on a column header
    $(".th_head").click(function(){
        numberOfClicks[$(this).index()] += 1;

        // sort the rows with respect to the current column --- $(this).index() -> the index of the column
        var rows = tbody.find("tr").toArray().sort(comparator($(this).index()));

        if (numberOfClicks[$(this).index()] % 2 == 0)
            rows.reverse();
        // this.asc = !this.asc
        // if (!this.asc){rows = rows.reverse()}

        for (var i = 0; i < rows.length; i++)
        {
            tbody.append(rows[i])
        }
    })

    // compares the values from 2 rows with respect to the column index
    function comparator(index) {
        return function(a, b) {
            var valueRowA = getCellValue(a, index), valueRowB = getCellValue(b, index);
            return $.isNumeric(valueRowA) && $.isNumeric(valueRowB) ? valueRowA - valueRowB : valueRowA.toString().localeCompare(valueRowB)
        }
    }

    // returns the value from row, column
    function getCellValue(row, column)
    {
        return $(row).children('td').eq(column).text()
    }


    // click on a column footer
    $(".th_foot").click(function(){
        if ($(this).index() == 3)
            swapColumns(0, $(this).index());
        else
            swapColumns($(this).index(), $(this).next().index())
    })

    // swaps column indexColumn1 with column indexColumn2
    function swapColumns(indexColumn1, indexColumn2)
    {
        var rows = table.find("tr");
        var columns;

        rows.each(
            function()
            {
                columns = $(this).children('th, td');
                columns.eq(indexColumn1).insertAfter(columns.eq(indexColumn2));
                
                // column 3 is still the same column 3 from the start of the function
                // column 1 will be the new column 0 before the insertBefore
                if(indexColumn1 == 0 && indexColumn2 == 3)
                    columns.eq(3).insertBefore(columns.eq(1));
            }
        )
    }
});