$(document).ready(function() {
    // create the App instance.
    var App = new Application({
        // ...
    });
});
/**
 * This is the class that represents the application.
 *
 * @class Application
 * @param options {Object} Any additional parameters.
 */
var Application = function(options) {
    var self = this;

    // defines the default settings for the app.
    self.options = _.defaults(options || {}, {
        $app: null,
        $header: null,
        $expo: null,
        $news: null,
        $games: null,
        $about: null,
        $contact: null
    });
    /**
     * This method will create the app and the main structure of the web page.
     *
     * @method init
     */
    self.init = function() {
        var self = this;

        // create the markup structure for the app.
        self.options.$app = $("#app").render("templates/app.ejs");
        self.options.$header = $("#app > #header").render("templates/header.ejs");
        self.options.$expo = $("#app > #expo").render("templates/expo.ejs");
        self.options.$news = $("#app > #news").render("templates/news.ejs", {
            newsArticles: AG_DATA.NEWS_ARTICLES
        });
        self.options.$games = $("#app > #games").render("templates/games.ejs", {
            games: AG_DATA.GAMES
        });
        self.options.$about = $("#app > #about").render("templates/about.ejs", {
            message: AG_DATA.ABOUT_MESSAGE,
            links: AG_DATA.ABOUT_LINKS,
            members: AG_DATA.TEAM_MEMBERS
        });
        self.options.$contact = $("#app > #contact").render("templates/contact.ejs", {
            message: AG_DATA.CONTACT_MESSAGE
        });
        // perform post-render behaviour
        self.postRender();
    };
    /**
     * This method will perform post-render behaviour.
     *
     * @method postRender
     */
    self.postRender = function() {
        var self = this;

        // binds the click behaviour for the navigation links
        self.options.$header.find("> .nav-list > .nav-item > a").click(function(ev) {
            var $el = $(ev.target);
            var $section = $(".section"+$el.attr("href"));
            var offsetTop = $section.offset().top;

            ev.preventDefault();

            $("body,html").animate({scrollTop:offsetTop}, {duration: 500, easing: "swing"});
        });
        // handle mouse events on news items
        self.options.$news.find(".news-article").mouseover(function() { $(this).addClass("hover"); });
        self.options.$news.find(".news-article").mouseout(function() { $(this).removeClass("hover"); });

        // handle mouse events on game items
        self.options.$games.find(".game").mouseover(function() { $(this).addClass("hover"); });
        self.options.$games.find(".game").mouseout(function() { $(this).removeClass("hover"); });

        // create the carousel
        var carousel = new Carousel({
            $el: self.options.$expo.find("> .carousel"),
            sources: AG_DATA.EXPO_SOURCES
        });
    };
    // initialize the Application on its own.
    self.init();
};
