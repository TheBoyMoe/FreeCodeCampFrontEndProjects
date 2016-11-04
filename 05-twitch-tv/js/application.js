$(document).ready(function () {

    /*

    USE THE FOLLOWING API FOR THE CHALLENGE in place of the Twitch API base URL https://api.twitch.tv/kraken

    https://wind-bow.hyperdev.space/twitch-api

    This server caches data to lower the request rate. To prevent abuses this server accepts GET requests only,
    and serves only routes /users/:user, /channels/:channel, and /streams/:stream

    // DEBUG
    curl -H 'Accept: application/vnd.twitchtv.v3+json' -X GET https://wind-bow.hyperdev.space/twitch-api/streams/freecodecamp?callback=?"
    curl -H 'Accept: application/vnd.twitchtv.v3+json' -X GET https://wind-bow.hyperdev.space/twitch-api/users/freecodecamp?callback=?"

    result:
     {"stream":null,"_links":{"self":"https://api.twitch.tv/kraken/streams/freecodecamp","channel":"https://api.twitch.tv/kraken/channels/freecodecamp"}}

     Link address :
     https://www.twitch.tv/[stream]

    */

    /*
    STREAM LIVE
     curl -H 'Accept: application/vnd.twitchtv.v3+json' -X GET https://wind-bow.hyperdev.space/twitch-api/streams/ESL_SC2

    result:
    {
        "stream": {

            "_id":23557640448,
            "game":"StarCraft II",
            "viewers":525,
            "created_at":"2016-11-02T00:56:45Z",
            "video_height":720,
            "average_fps":50,
            "delay":0,
            "is_playlist":false,
            "_links":{
                "self":"https://api.twitch.tv/kraken/streams/esl_sc2"
            },
            "preview":{
                "small":"https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-80x45.jpg",
                "medium":"https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-320x180.jpg",
                "large":"https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-640x360.jpg",
                "template":"https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-{width}x{height}.jpg" // 3:2 ratio
            },
            "channel":{
                "mature":false,
                "status":"RERUN: StarCraft 2 - INnoVation vs. Life (TvZ) - IEM Katowice 2015 - Ro16",
                "broadcaster_language":"en",
                "display_name":"ESL_SC2",
                "game":"StarCraft II",
                "language":"en",
                "_id":30220059,
                "name":"esl_sc2",
                "created_at":"2012-05-02T09:59:20Z",
                "updated_at":"2016-11-03T17:34:32Z",
                "delay":null,
                "logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
                "banner":null,
                "video_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
                "background":null,
                "profile_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
                "profile_banner_background_color":"#050506",
                "partner":true,
                "url":"https://www.twitch.tv/esl_sc2",
                "views":61131216,
                "followers":135459,
                "_links":{
                    "self":"http://api.twitch.tv/kraken/channels/esl_sc2",
                    "follows":"http://api.twitch.tv/kraken/channels/esl_sc2/follows",
                    "commercial":"http://api.twitch.tv/kraken/channels/esl_sc2/commercial",
                    "stream_key":"http://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
                    "chat":"http://api.twitch.tv/kraken/chat/esl_sc2",
                    "subscriptions":"http://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
                    "editors":"http://api.twitch.tv/kraken/channels/esl_sc2/editors",
                    "teams":"http://api.twitch.tv/kraken/channels/esl_sc2/teams",
                    "videos":"http://api.twitch.tv/kraken/channels/esl_sc2/videos"
                }
            }
        },
        "_links":{
            "self":"https://api.twitch.tv/kraken/streams/ESL_SC2",
            "channel":"https://api.twitch.tv/kraken/channels/ESL_SC2"
        }
    }


    // STREAM OFFLINE
    {
        "stream":null,
        "_links":{
            "self":"https://api.twitch.tv/kraken/streams/freecodecamp",
            "channel":"https://api.twitch.tv/kraken/channels/freecodecamp"
        }
    }


    // CHECK USER
    curl -H 'Accept: application/vnd.twitchtv.v3+json' -X GET https://wind-bow.hyperdev.space/twitch-api/users/freecodecamp

    {
        "display_name":"FreeCodeCamp",
        "_id":79776140,
        "name":"freecodecamp",
        "type":"user",
        "bio":"We help you learn to code, then practice by building projects for nonprofits. Learn Full-stack JavaScript,
                build a portfolio, and get a coding job by joining our open source community at https://freecodecamp.com",
         "created_at":"2015-01-14T03:36:47Z",
         "updated_at":"2016-11-04T07:30:49Z",
         "logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
         "_links":{
            "self":"https://api.twitch.tv/kraken/users/freecodecamp"
         }
    }


    // CHECK CHANNEL
    curl -H 'Accept: application/vnd.twitchtv.v3+json' -X GET https://wind-bow.hyperdev.space/twitch-api/channels/freecodecamp

    result:

    {
        "mature":false,
        "status":"Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
        "broadcaster_language":"en",
        "display_name":"FreeCodeCamp",
        "game":"Creative",
        "language":"en",
        "_id":79776140,
        "name":"freecodecamp",
        "created_at":"2015-01-14T03:36:47Z",
        "updated_at":"2016-11-04T07:30:49Z",
        "delay":null,
        "logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
        "banner":null,
        "video_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
        "background":null,
        "profile_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
        "profile_banner_background_color":null,
        "partner":false,
        "url":"https://www.twitch.tv/freecodecamp",
        "views":165987,
        "followers":10219,
        "_links":{
            "self":"https://api.twitch.tv/kraken/channels/freecodecamp",
            "follows":"https://api.twitch.tv/kraken/channels/freecodecamp/follows",
            "commercial":"https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
            "stream_key":"https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
            "chat":"https://api.twitch.tv/kraken/chat/freecodecamp",
            "subscriptions":"https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
            "editors":"https://api.twitch.tv/kraken/channels/freecodecamp/editors",
            "teams":"https://api.twitch.tv/kraken/channels/freecodecamp/teams",
            "videos":"https://api.twitch.tv/kraken/channels/freecodecamp/videos"
         }
     }


    */


    // array of twitch user names of users who regularly stream
    var accounts =
        ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
            "brunofin", "comster404", "Multiplay_CSGO", "TheAdiposeTV", "BeyondTheSummit", "TKbreezy", "FACEIT_TV"];

    var placeHolderLogo = "https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png";
    var channelBaseUrl = "https://wind-bow.hyperdev.space/twitch-api/channels/";
    var callback = "?callback=?";

    // iterate through the array downloading stream details
    accounts.map(function (item) {
        downloadTwitchTVStream(item);
    });


    // handle list item clicks
    $(".stream a").on('click', function (e) {
        e.preventDefault();
    });


    function downloadTwitchTVStream(userChannel) {

        // code example
        // Ref: https://discuss.dev.twitch.tv/t/check-whether-channel-is-online-or-not-via-js-solution-found/2019/5
        $.ajax({
            type: 'GET',
            url: 'https://wind-bow.hyperdev.space/twitch-api/streams/' + userChannel +'?callback=?',
            contentType: "application/vnd.twitchtv.v3+json",
            dataType: 'jsonp',
            success: function (channel) {
                //request succeeded, check channel status here
                if (channel.stream !== null) {
                    if (channel.stream === undefined) {
                        // USER ACCOUNT DOES NOT EXIST
                        $("#streams").append(
                            '<li class="stream clearfix center-parent offline">' +
                                '<a href="#" class="clearfix">' +
                                    '<div class="outer-wrap pull-right clearfix center-child">' +
                                        '<div class="wrap pull-left">' +
                                            '<h3 class="account">'+ userChannel + '</h3>' +
                                            '<p class="description">user account does not exist or has been closed</p>' +
                                        '</div>' +
                                        '<div class="status pull-right center-child">' +
                                            '<span class="hidden">LIVE</span>' +
                                            '<span class="show">Closed</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<img class="avatar img-circle img-thumbnail img-responsive pull-left" src="' + placeHolderLogo + '">' +
                                '</a>'+
                            '</li>'
                        );

                    } else {
                        // STREAM LIVE
                        $("#streams").append(
                            '<li class="stream clearfix center-parent online">' +
                                '<a href="' + channel.stream.channel.url + '" class="clearfix" target="_blank">' +
                                    '<div class="outer-wrap pull-right clearfix center-child">' +
                                        '<div class="wrap pull-left">' +
                                            '<h3 class="account">'+ channel.stream.channel.display_name +'</h3>' +
                                            '<p class="description">' + channel.stream.channel.game + ', ' + channel.stream.channel.status +'</p>' +
                                        '</div>' +
                                        '<div class="status pull-right center-child">' +
                                            '<span class="show">LIVE</span>' +
                                            '<span class="hidden">Offline</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<img class="avatar img-circle img-thumbnail img-responsive pull-left" src="' + channel.stream.channel.logo + '">' +
                                '</a>'+
                            '</li>'
                        );

                    }
                } else {
                    // STREAM OFFLINE
                    var logo = "";

                    $("#streams").append(
                        '<li class="stream clearfix center-parent offline">' +
                            '<a href="https://www.twitch.tv/' + userChannel + '" class="clearfix channel-logo">' +
                                '<div class="outer-wrap pull-right clearfix center-child">' +
                                    '<div class="wrap pull-left">' +
                                        '<h3 class="account">'+ userChannel +'</h3>' +
                                    '</div>' +
                                    '<div class="status pull-right center-child">' +
                                        '<span class="hidden">LIVE</span>' +
                                        '<span class="show">Offline</span>' +
                                    '</div>' +
                                '</div>' +
                            '</a>'+
                        '</li>'
                    );

                    $.getJSON(channelBaseUrl + userChannel + callback, function (result) {
                        logo = result.logo;
                        $(".channel-logo").append(
                            '<img class="avatar img-circle img-thumbnail img-responsive pull-left" src="' + logo + '">'
                        );
                    });

                }
            },
            error: function () {
                //request failed
                console.log("An error has occurred");
            }
        });
    }



    function fetchLogo(channelUrl) {

        $.getJSON(channelUrl, function (result) {
             return result.logo;
        });
    }


    // code example - ensure to include callback?= so request is treated as jsonp (avoid CORS error)
    // http://forum.freecodecamp.com/t/use-the-twitchtv-json-api/19541
    // $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
    //    console.log(data);
    // })


});
