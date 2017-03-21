$(document).ready(function () {
    
    
    
    $("#search").submit(function (event) {
        event.preventDefault();
        var searchTerm = document.getElementById("searchBar").value;
        var searchApi = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
        if (searchTerm < 1) {
            alert("Please enter a Wikipedia query!");
        }
        else {
            $.ajax({
                type: "GET"
                , url: searchApi
                , async: false
                , dataType: "json"
                , success: function (val) {
                    $("#yourSearch").html("Your search for <em>" + val[0] + "</em> returned the following results:")
                        //Title results
                    for (var i = 0; i < val[1].length; i++) {
                        $("#result" + i + "T").html(val[1][i]);
                    }
                    //Description results
                    for (var j = 0; j < val[2].length; j++) {
                        $("#result" + j + "D").html(val[2][j]);
                    }
                    //Link results
                    for (var k = 0; k < val[3].length; k++) {
                        $("#result" + k + "L").attr({
                            "href": val[3][k]
                            , "target": "_blank"
                        });
                    }
                    $("#searchResults").removeClass("hideDisplay")
                    $("#searchResults").addClass("showDisplay");
                }
                , error: function (error) {
                    alert("Something went wrong..");
                }
            });
        }
    });
});