$(document).ready(function () {


    var accounts =
        ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
            "brunofin", "comster404", "Multiplay_CSGO", "TheAdiposeTV", "BeyondTheSummit", "TKbreezy", "FACEIT_TV"];

    var placeHolderLogo = "https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png";
    var accountClosed = "User account does not exist or has been closed";
    var channelBaseUrl = "https://wind-bow.hyperdev.space/twitch-api/channels/";
    var callback = "?callback=?";
    var channelOnline = "online";
    var channelOffline = "offline";
    var channelClosed = "closed";
    var statusOnline = "LIVE";
    var statusOffline = "Offline";
    var noUrl = "#";
    var user = {};

    accounts.map(function (userChannel) {
        downloadTwitchTV(userChannel);
    });


    $(".stream a").on('click', function (e) {
        e.preventDefault();
    });

    $("#input-field").keyup(function () {
        filterListItems();
    });

    function downloadTwitchTV(userChannel) {

        $.ajax({
            type: "GET",
            url: 'https://wind-bow.hyperdev.space/twitch-api/streams/' + userChannel +'?callback=?',
            contentType: "application/vnd.twitchtv.v3+json",
            dataType: 'jsonp',
            success: function (result) {
                if (result.stream !== null) {
                    if (result.stream === undefined) {
                        // ACCOUNT DOES NOT EXIST OR CLOSED
                        user.logo = placeHolderLogo;
                        user.name = userChannel;
                        user.description = accountClosed;
                        user.status = statusOffline;
                        user.channelStatus = channelClosed;
                        user.url = noUrl;
                        populateListItem(user);
                    } else {
                        // STREAM LIVE
                        user.logo = result.stream.channel.logo;
                        user.name = result.stream.channel.display_name;
                        user.description = result.stream.channel.game + ', ' + result.stream.channel.status;
                        user.status = statusOnline;
                        user.channelStatus = channelOnline;
                        user.url = result.stream.channel.url;
                        populateListItem(user);
                    }
                } else  {
                    // STREAM OFFLINE
                    fetchLogo(channelBaseUrl + userChannel + callback);
                }
            },
            error: function () {
                //request failed
                console.log("An error has occurred");
            }
        })
    }

    function fetchLogo(channelUrl) {

        $.getJSON(channelUrl, function (result) {
            user.logo = result.logo ? result.logo : placeHolderLogo;
            user.name = result.display_name;
            // user.description = result.status ? result.status : "";
            user.description = "";
            user.status = statusOffline;
            user.channelStatus = channelOffline;
            user.url = result.url;
            populateListItem(user);
        });
    }

    function populateListItem(user) {
        $("#streams").append(
            '<li class="stream clearfix center-parent ' + user.channelStatus + '">' +
                '<a href="' + user.url + '" class="clearfix" target="_blank">' +
                    '<div class="outer-wrap pull-right clearfix center-child">' +
                        '<div class="wrap pull-left">' +
                            '<h3 class="user-name">'+ user.name + '</h3>' +
                            '<p class="description">' + user.description + '</p>' +
                        '</div>' +
                        '<div class="status pull-right center-child">' +
                            '<span class="status">' + user.status + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<img class="avatar img-circle img-thumbnail img-responsive pull-left" src="' + user.logo + '">' +
                '</a>'+
            '</li>'
        );
    }

    function filterListItems() {

        var input = document.getElementById("input-field");
        var list = document.getElementById("streams");
        var listItems = list.getElementsByTagName("li");

        // fetch the entered text
        var text = input.value.toLowerCase();
        console.log("Text: " + text + ", list size: " + listItems.length);
        // iterate through listItems' h3 elements, hiding those that do not match
        for (var i = 0; i < listItems.length; i++) {
            var header = listItems[i].getElementsByTagName("h3")[0];
            var value =  header.innerHTML.toLowerCase().indexOf(text);
            console.log("item: " + i + ", value: " + value);
            if (value > -1) {
                // found match
                listItems[i].style.display = "";
            } else {
                // no match, hide item
                listItems[i].style.display = "none";
            }
        }
    }

});
