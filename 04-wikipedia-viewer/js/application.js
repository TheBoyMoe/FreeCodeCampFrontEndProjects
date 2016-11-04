$(document).ready(function () {

    // Reference:
    // [1] Wikipedia API:search

    var searchResults = $("#search-results");
    var inputField = $("input.form-control");
    var searchQuery = "";

    $(".btn-search").on('click', function () {
        executeWikiSearch();
    });

    // execute search on pressing the enter key
    $(document).keypress(function(e) {
        if(e.which == 13) {
            executeWikiSearch();
        }
    });


    function executeWikiSearch() {
        searchResults.empty(); // clear any results

        // retrieve the query from the search field
        searchQuery = inputField.val();

        if (searchQuery !== "") {

            // execute the search
            $.ajax({
                type: "GET",                                            // http method
                url: "https://en.wikipedia.org/w/api.php?",             // base url
                data: {                                                 // query parameters
                    // action: "opensearch",                            // fetch pages whose name matches the query
                    action: "query",
                    list: "search",
                    srsearch: searchQuery,
                    format: "json",
                    srprop: "titlesnippet|snippet|wordcount|timestamp"
                },
                contentType: "application/json; charset=utf-8",
                async: true,
                dataType: "jsonp",                                      // requires 'jsonp' otherwise throws CORS cross domain script error
                success: function (result) {

                    // iterate through result, populate <li> with each item and append to #search-results <ol>
                    if (result.query.searchinfo.totalhits > 0) {

                        var resultArray = result.query.search;
                        resultArray.map(function (item) {

                            // DEBUG
                            // console.log("title:" + item.title + "\nsnippet: " + item.snippet
                            // + "\nwordcount: " + item.wordcount + "\ntimestamp: " + item.timestamp
                            // + "\nredirects: " + item.redirects);

                            searchResults.append("<li class='result'><a href='https://en.wikipedia.org/wiki/" + item.title +"' target='_blank'><h3 class='result-title'>" + item.title + "</h3><p class='result-text'>" + item.snippet + "</p></a></li>");

                        })

                    }
                    else {
                        // console.log("No results match query: " + searchQuery); // DEBUG
                        searchResults.append("<div class='no-match'><h4>No results match your query: <span class='query'>" + searchQuery + "</span></h4>" +
                            "<ul><li>Check your spelling and try again</li><li>Try a different phrase</li></ul></div>");
                    }

                },
                error: function (error) {
                    // console.log("Error message: " + error.toString()); // DEBUG
                    searchResults.append("<div class='error'><h4>An error has occurred executing the request. Check your network connection, refresh the page and try again</h4></div>");
                }
            });

        } else {
            searchResults.append("<div class='error'><h4>A word or phrase is required to execute the search, otherwise click on the 'Feeling Lucky' button</h4></div>");
        }

        inputField.val(""); // clear field
    }


    // DEBUG - example download
    // url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=titlesnippet|snippet|wordcount|timestamp|redirecttitle|redirectsnippet&srsearch=Patrick%20Stewart", // DEBUG

    /*
    var data = {
        "batchcomplete":"",
        "continue":{
            "sroffset":10,
            "continue":"-||"
        },
        "query":{
            "searchinfo":{
                "totalhits":4552
            },
            "search":[
                {
                    "ns":0,
                    "title":"Albert Einstein",
                    "snippet":"&quot;<span class=\"searchmatch\">Einstein</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (disambiguation) and <span class=\"searchmatch\">Einstein</span> (disambiguation). <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (/ˈaɪnstaɪn/; German: [ˈalbɛɐ̯t",
                    "size":137407,
                    "wordcount":14689,
                    "timestamp":"2016-10-30T11:58:09Z"
                },
                {
                    "ns":0,
                    "title":"Einstein family",
                    "snippet":"The <span class=\"searchmatch\">Einstein</span> family is the family of the physicist <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (1879–1955). <span class=\"searchmatch\">Einstein</span>'s great-great-great-great-grandfather, Jakob Weil, was his oldest",
                    "size":35360,
                    "wordcount":3516,
                    "timestamp":"2016-10-30T19:09:30Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein Medal",
                    "snippet":"The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Medal is an award presented by the <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Society in Bern. First given in 1979, the award is presented to people for &quot;scientific",
                    "size":2419,
                    "wordcount":222,
                    "timestamp":"2016-08-18T23:24:05Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein Hospital",
                    "snippet":"The Hospital Israelita <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (English: <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Israelite Hospital) is a Brazilian hospital, located in the Morumbi district, on the",
                    "size":6059,
                    "wordcount":228,
                    "timestamp":"2016-10-28T13:51:09Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein: The Practical Bohemian",
                    "snippet":"<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span>: The Practical Bohemian is a stage play that is the only show officially endorsed by the <span class=\"searchmatch\">Einstein</span> family. A quote from <span class=\"searchmatch\">Albert</span> Einstein's",
                    "size":2502,
                    "wordcount":231,
                    "timestamp":"2016-10-11T01:35:50Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein in popular culture",
                    "snippet":"<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> has been the subject of or inspiration for many works of popular culture. On <span class=\"searchmatch\">Einstein</span>'s 72nd birthday on March 14, 1951, UPI photographer",
                    "size":21414,
                    "wordcount":2212,
                    "timestamp":"2016-10-29T01:44:22Z"
                },
                {
                    "ns":0,
                    "title":"Political views of Albert Einstein",
                    "snippet":"<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> was widely known during his lifetime for his work with the theory of relativity and physics in general. His political opinions were of",
                    "size":40766,
                    "wordcount":4653,
                    "timestamp":"2016-11-01T11:05:36Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein Square (Jerusalem)",
                    "snippet":"<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Square (Kikar <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span>) is a public square in Jerusalem, Israel, named for the physicist <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span>. It is located in the",
                    "size":3019,
                    "wordcount":284,
                    "timestamp":"2016-06-27T20:43:55Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein Peace Prize",
                    "snippet":"The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Peace Prize is/was a peace prize awarded annually since 1980 by the <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Peace Prize Foundation. The Foundation dates from",
                    "size":8675,
                    "wordcount":581,
                    "timestamp":"2016-09-27T02:57:28Z"
                },
                {
                    "ns":0,
                    "title":"Albert Einstein College of Medicine",
                    "snippet":"confused with <span class=\"searchmatch\">Einstein</span> Medical Center. Coordinates: 40°51′03″N 73°50′42″W﻿ / ﻿40.850852°N 73.844949°W﻿ / 40.850852; -73.844949 The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> College of",
                    "size":48256,
                    "wordcount":5275,
                    "timestamp":"2016-09-10T19:54:25Z"
                }
            ]
        }
    }
    */


    /*
     References: https://codepen.io/FreeCodeCamp/full/wGqEga/

     "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10
     &prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=Patrick%20Stewart";

    {
        "batchcomplete":"",
        "continue":{
        "gsroffset":10,
            "continue":"gsroffset||"
    },
        "query":{
        "pages":{
            "736":{
                "pageid":736,
                    "ns":0,
                    "title":"Albert Einstein",
                    "index":1,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/38px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
                        "width":38,
                        "height":50
                },
                "pageimage":"Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
                    "extract":"Albert Einstein (/\u02c8a\u026ansta\u026an/; German: [\u02c8alb\u025b\u0250\u032ft \u02c8a\u026an\u0283ta\u026an]; 14 March 1879 \u2013 18 April 1955) was a German-born theoretical physicist."
            },
            "1755232":{
                "pageid":1755232,
                    "ns":0,
                    "title":"Albert Einstein: The Practical Bohemian",
                    "index":5,
                    "extract":"Albert Einstein: The Practical Bohemian is a stage play that is the only show officially endorsed by the Einstein family."
            },
            "319759":{
                "pageid":319759,
                    "ns":0,
                    "title":"Albert Einstein College of Medicine",
                    "index":10,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/en/thumb/4/45/PriceBig.JPG/50px-PriceBig.JPG",
                        "width":50,
                        "height":33
                },
                "pageimage":"PriceBig.JPG",
                    "extract":"The Albert Einstein College of Medicine (\"Einstein\"), a part of Montefiore Medical Center, is a not-for-profit, private, nonsectarian medical school located in the Morris Park neighborhood of the Bronx in New York City."
            },
            "27238977":{
                "pageid":27238977,
                    "ns":0,
                    "title":"Albert Einstein Hospital",
                    "index":4,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hospital_Albert_Einstein.jpg/50px-Hospital_Albert_Einstein.jpg",
                        "width":50,
                        "height":38
                },
                "pageimage":"Hospital_Albert_Einstein.jpg",
                    "extract":"The Hospital Israelita Albert Einstein (English: Albert Einstein Israelite Hospital) is a Brazilian hospital, located in the Morumbi district, on the south side of S\u00e3o Paulo."
            },
            "3887135":{
                "pageid":3887135,
                    "ns":0,
                    "title":"Albert Einstein Medal",
                    "index":3,
                    "extract":"The Albert Einstein Medal is an award presented by the Albert Einstein Society in Bern."
            },
            "3720557":{
                "pageid":3720557,
                    "ns":0,
                    "title":"Albert Einstein Peace Prize",
                    "index":8,
                    "extract":"The Albert Einstein Peace Prize is/was a peace prize awarded annually since 1980 by the Albert Einstein Peace Prize Foundation."
            },
            "48394216":{
                "pageid":48394216,
                    "ns":0,
                    "title":"Albert Einstein Square (Jerusalem)",
                    "index":9,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Albert_Einstein_Square_sign%2C_Jerusalem.JPG/50px-Albert_Einstein_Square_sign%2C_Jerusalem.JPG",
                        "width":50,
                        "height":38
                },
                "pageimage":"Albert_Einstein_Square_sign,_Jerusalem.JPG",
                    "extract":"Albert Einstein Square (Kikar Albert Einstein) is a public square in Jerusalem, Israel, named for the physicist Albert Einstein."
            },
            "12333667":{
                "pageid":12333667,
                    "ns":0,
                    "title":"Albert Einstein in popular culture",
                    "index":6,
                    "extract":"Albert Einstein has been the subject of or inspiration for many works of popular culture."
            },
            "18742711":{
                "pageid":18742711,
                    "ns":0,
                    "title":"Einstein family",
                    "index":2,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Einstein_Family.jpg/41px-Einstein_Family.jpg",
                        "width":41,
                        "height":50
                },
                "pageimage":"Einstein_Family.jpg",
                    "extract":"The Einstein family is the family of the physicist Albert Einstein (1879\u20131955)."
            },
            "24004485":{
                "pageid":24004485,
                    "ns":0,
                    "title":"Political views of Albert Einstein",
                    "index":7,
                    "thumbnail":{
                    "source":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Citizen-Einstein.jpg/50px-Citizen-Einstein.jpg",
                        "width":50,
                        "height":38
                },
                "pageimage":"Citizen-Einstein.jpg",
                    "extract":"Albert Einstein was widely known during his lifetime for his work with the theory of relativity and physics in general."
            }
        }
    },
        "limits":{
        "pageimages":50,
            "extracts":20
    }
    }

    */

});
