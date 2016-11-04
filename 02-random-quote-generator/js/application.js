$(document).ready(function () {

    var getQuote = "";
    var getCite = "";

    // load random quote on page load
    $(function () {
        loadRandomQuote(fetchRandomQuote);
    });

    // load random quote on button click
    $(".quote-button").click(function () {
        loadRandomQuote(fetchRandomQuote);
    });

    // share quote on twitter
    $(".twitter-share").click(function (event) {
        event.preventDefault(); // stop default browser behaviour on link click

        window.open("http://twitter.com/intent/tweet?text=" +
            getQuote + " " + getCite + "&", "twitterwindow", "height=450, width=550, toolbar=0, " +
            "location=0, menubar=0, directories=0, scrollbars=0");
    });

    var fetchRandomQuote = function () {
        var num = Math.floor(Math.random() * quoteList.length);
        return quoteList[num];
    };

    var loadRandomQuote = function (fetchRandomQuote) {
        var quote = fetchRandomQuote();
        $(".quote p").text(quote.quote);
        $(".quote cite").text(quote.author);
        $(".avatar").css("background-image", "url(" + quote.avatar + ")");
        getTweet(quote);
    };

    var getTweet = function (quote) {
        // ensure tweet <= 140
        var text  = quote.quote;
        var cite = quote.author;
        var str = "";
        //console.log("text length: " + text.length + ", cite length: " + cite.length + ", total: " + (text.length + cite.length));
        if ((text.length + cite.length) > 138) {
            str = text.slice(0, (138 - cite.length - 3)) + "...";
            getQuote = str;
        } else {
            getQuote = text;
        }

        getCite = cite;
        //console.log("quote: " + getQuote + " cite: " + getCite);
    }

    // data
    var quoteList = [
        {
            "author": "Jim Rohn",
            "quote": "Never wish life were easier, wish that you were better",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Jim Rohn",
            "quote": "Formal education will make you a living; self-education will make you a fortune",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Jim Rohn",
            "quote": "Discipline is the bridge between goals and accomplishment.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Jim Rohn",
            "quote": "Success is nothing more than a few simple disciplines, practiced every day.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Jim Rohn",
            "quote": "Never wish for fewer problems, wish for more skills",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Jim Rohn",
            "quote": "We must all suffer one of two things: the pain of discipline or the pain of regret or disappointment.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jim-rohn-PASSES-AWAY.jpg",
            "attribution": "By Ramine5677 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons"
        },
        {
            "author": "Denis Waitely",
            "quote": "There are two primary choices in life: to accept conditions as they exist, or accept the responsibility for changing them.",
            "avatar": "https://pbs.twimg.com/profile_images/2286983240/yecrwwrm6otu7cck3h36.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Denis Waitely",
            "quote": "Change the changeable, accept the unchangeable, and remove yourself from the unacceptable.",
            "avatar": "https://pbs.twimg.com/profile_images/2286983240/yecrwwrm6otu7cck3h36.jpeg",
            "attribution": "Public Twitter avatar"
        },{
            "author": "Denis Waitely",
            "quote": "If you believe you can, you probably can. If you believe you won't, you most assuredly won't. Belief is the ignition switch that gets you off the launching pad.",
            "avatar": "https://pbs.twimg.com/profile_images/2286983240/yecrwwrm6otu7cck3h36.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Denis Waitely",
            "quote": "Don't dwell on what went wrong. Instead, focus on what to do next. Spend your energies on moving forward toward finding the answer.",
            "avatar": "https://pbs.twimg.com/profile_images/2286983240/yecrwwrm6otu7cck3h36.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Denis Waitely",
            "quote": "Life is inherently risky. There is only one big risk you should avoid at all costs, and that is the risk of doing nothing.",
            "avatar": "https://pbs.twimg.com/profile_images/2286983240/yecrwwrm6otu7cck3h36.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Les Brown",
            "quote": "Life takes on meaning when you become motivated, set goals and charge after them in an unstoppable manner.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/9/91/Les_Brown_speaking.jpg",
            "attribution": "By Dominick Brady from Atlanta, Georgia, United States (Les Brown) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Les Brown",
            "quote": "Accept responsibility for your life. Know that it is you who will get you where you want to go, no one else.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/9/91/Les_Brown_speaking.jpg",
            "attribution": "By Dominick Brady from Atlanta, Georgia, United States (Les Brown) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Les Brown",
            "quote": "Just because Fate doesn't deal you the right cards, it doesn't mean you should give up. It just means you have to play the cards you get to their maximum potential.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/9/91/Les_Brown_speaking.jpg",
            "attribution": "By Dominick Brady from Atlanta, Georgia, United States (Les Brown) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Brian Tracy",
            "quote": "Successful people are always looking for opportunities to help others. Unsuccessful people are always asking, 'What's in it for me?'",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Brian Tracy",
            "quote": "I've found that luck is quite predictable. If you want more luck, take more chances. Be more active. Show up more often.",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Brian Tracy",
            "quote": "The key to success is to focus our conscious mind on things we desire not things we fear.",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Brian Tracy",
            "quote": "People with clear, written goals, accomplish far more in a shorter period of time than people without them could ever imagine.",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Brian Tracy",
            "quote": "The more credit you give away, the more will come back to you. The more you help others, the more they will want to help you.",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"

        },
        {
            "author": "Brian Tracy",
            "quote": "Successful people are simply those with successful habits.",
            "avatar": "https://pbs.twimg.com/profile_images/454727289687666688/A4-v5kzr.jpeg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Tony Robbins",
            "quote": "Quality questions create a quality life. Successful people ask better questions, and as a result, they get better answers.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tony_Robbins.jpg",
            "attribution": "By Randy Stewart (http://www.flickr.com/photos/stewtopia/3948482669/) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Tony Robbins",
            "quote": "A real decision is measured by the fact that you've taken a new action. If there's no action, you haven't truly decided.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tony_Robbins.jpg",
            "attribution": "By Randy Stewart (http://www.flickr.com/photos/stewtopia/3948482669/) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Tony Robbins",
            "quote": "If you want to be successful, find someone who has achieved the results you want and copy what they do and you'll achieve the same results.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tony_Robbins.jpg",
            "attribution": "By Randy Stewart (http://www.flickr.com/photos/stewtopia/3948482669/) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Tony Robbins",
            "quote": "People are not lazy. They simply have impotent goals - that is, goals that do not inspire them.",
            "avatar": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tony_Robbins.jpg",
            "attribution": "By Randy Stewart (http://www.flickr.com/photos/stewtopia/3948482669/) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons"
        },
        {
            "author": "Earl Nightingale",
            "quote": "Whatever we plant in our subconscious mind and nourish with repetition and emotion will one day become a reality.",
            "avatar": "https://pbs.twimg.com/profile_images/742659420878962688/Hz5oUraP.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Earl Nightingale",
            "quote": "People with goals succeed because they know where they're going.",
            "avatar": "https://pbs.twimg.com/profile_images/742659420878962688/Hz5oUraP.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Earl Nightingale",
            "quote": "The more intensely we feel about an idea or a goal, the more assuredly the idea, buried deep in our subconscious, will direct us along the avatar to its fulfillment.",
            "avatar": "https://pbs.twimg.com/profile_images/742659420878962688/Hz5oUraP.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Earl Nightingale",
            "quote": "Our environment, the world in which we live and work, is a mirror of our attitudes and expectations.",
            "avatar": "https://pbs.twimg.com/profile_images/742659420878962688/Hz5oUraP.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Joel Weldon",
            "quote": "Success comes in cans, not cannots",
            "avatar": "https://pbs.twimg.com/profile_images/695642061647687680/NcdLgq9Z.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Og Mandino",
            "quote": "Take the attitude of a student, never be too big to ask questions, never know too much to learn something new.",
            "avatar": "https://upload.wikimedia.org/wikipedia/en/b/b9/OgMandinoInspirationalwriter.jpg",
            "atribution": "http://www.ogmandino.com/about-og-mandino/"
        },
        {
            "author": "Og Mandino",
            "quote": "Always render more and better service than is expected of you, no matter what your task may be.",
            "avatar": "https://upload.wikimedia.org/wikipedia/en/b/b9/OgMandinoInspirationalwriter.jpg",
            "atribution": "http://www.ogmandino.com/about-og-mandino/"
        },
        {
            "author": "Og Mandino",
            "quote": "Obstacles are necessary for success because in selling, as in all careers of importance, victory comes only after many struggles and countless defeats.",
            "avatar": "https://upload.wikimedia.org/wikipedia/en/b/b9/OgMandinoInspirationalwriter.jpg",
            "atribution": "http://www.ogmandino.com/about-og-mandino/"
        },
        {
            "author": "Og Mandino",
            "quote": "Sound character provides the power with which a person may ride the emergencies of life instead of being overwhelmed by them. Failure is... the highway to success.",
            "avatar": "https://upload.wikimedia.org/wikipedia/en/b/b9/OgMandinoInspirationalwriter.jpg",
            "atribution": "http://www.ogmandino.com/about-og-mandino/"
        },
        {
            "author": "Og Mandino",
            "quote": "Work as though you would live forever, and live as though you would die today. Go another mile!",
            "avatar": "https://upload.wikimedia.org/wikipedia/en/b/b9/OgMandinoInspirationalwriter.jpg",
            "atribution": "http://www.ogmandino.com/about-og-mandino/"
        },
        {
            "author": "Stephen Covey",
            "quote": "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "Seek first to understand, then to be understood.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "Live out of your imagination, not your history.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "Start with the end in mind.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "There are three constants in life... change, choice and principles.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "Motivation is a fire from within. If someone else tries to light that fire under you, chances are it will burn very briefly.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Stephen Covey",
            "quote": "Management is efficiency in climbing the ladder of success; leadership determines whether the ladder is leaning against the right wall.",
            "avatar": "https://pbs.twimg.com/profile_images/107350755/src2.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "It's not whether you get knocked down, it's whether you get up.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "The only place success comes before work is in the dictionary.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "The quality of a person's life is in direct proportion to their commitment to excellence, regardless of their chosen field of endeavor.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "Winners never quit and quitters never win.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Twitter avatar"
        },
        {
            "author": "Vince Lombardi",
            "quote": "Fatigue makes cowards of us all.",
            "avatar": "https://pbs.twimg.com/profile_images/179897661/lombardi.jpg",
            "attribution": "Public Public Twitter avatar avatar"
        }

    ]

});
