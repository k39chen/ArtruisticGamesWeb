/**
 * This is the carousel widget.
 *
 * @class Carousel
 * @param options {Object} Any additional parameters.
 */
var Carousel = function(options) {
    var self = this;

    // defines the default settings for the carousel.
    self.options = _.defaults(options || {}, {
        $el: null,
        sources: [],
        currentIndex: 0,
        resizeIntervals: {},
        slideshowInterval: null,
        slideshowDelay: 5000
    });
    /**
     * Initialize the widget.
     *
     * @method init
     */
    self.init = function() {
        var self = this;

        // render the widget
        self.render();
    };
    /**
     * Destroy the widget.
     *
     * @method destroy
     */
    self.destroy = function() {
        var self = this;
        _.each(self.options.resizeIntervals, function(interval) {
            clearInterval(interval);
        });
        clearInterval(self.options.slideshowInterval);
    };
    /**
     * Render the widget.
     *
     * @method render
     */
    self.render = function() {
        var self = this;

        // create the markup for this widget
        self.options.$el.render("/js/widgets/Carousel/view.ejs", {
            sources: self.options.sources
        });
        // perform post-render behaviour.
        self.postRender();
    };
    /**
     * Perform the post-render behaviour.
     *
     * @method postRender
     */
    self.postRender = function() {
        var self = this;
        var $container = self.options.$el.find(".panels");
        var $controls = self.options.$el.find(".control");

        self.options.$el.find(".panel").each(function() {
            $(this).on("load", function() {
                var $panel = $(this);
                var index = $(this).data("index");

                // adjust the image size accordingly
                self.applyImageFit($container, $panel);

                // every 100 ms, we will apply the appropriate image size
                self.options.resizeIntervals[index] = setInterval($.proxy(function($container, $panel) {
                    var self = this;
                    if (parseInt($panel.data("index"), 10) !== index) return;
                    self.applyImageFit($container, $panel);
                }, self, $container, $panel), 100);
            });
        });
        // set the first image as active.
        self.setActive(self.options.currentIndex);

        // start up an interval
        self.restartSlideshowTimer();

        // bind the click event
        $controls.click(function() {
            var index = $(this).data("index");
            self.setActive(index);
            self.restartSlideshowTimer();
        });
    };
    /**
     * (Re)starts the slideshow timer.
     *
     * @method restartSlideshowTimer
     */
    self.restartSlideshowTimer = function() {
        var self = this;
        self.options.slideshowInterval = setInterval($.proxy(function() {
            self.options.currentIndex = (self.options.currentIndex + 1) % self.options.sources.length;
            self.setActive(self.options.currentIndex);
        }, self), self.options.slideshowDelay);
    };
    /**
     * Sets a panel as active.
     *
     * @method setActive
     * @param index {Number} The index of the panel that we want to set as active.
     */
    self.setActive = function(index) {
        var self = this;
        var $panels = self.options.$el.find(".panels");
        var $controls = self.options.$el.find(".controls");

        $panels.find("> .panel").removeClass("active");
        $panels.find("> .panel[data-index='"+index+"']").addClass("active");

        $controls.find("> .control").removeClass("active");
        $controls.find("> .control[data-index='"+index+"']").addClass("active");
    };
    /**
     * Apply the image fit algorithm accordingly.
     *
     * @method applyImageFit
     * @param $container {Object} The container DOM element.
     * @param $panel {Object} The panel DOM element.
     */
    self.applyImageFit = function($container, $panel) {
        var fit = computeImageFit(
            IMAGE_FIT.BEST_FILL,
            IMAGE_FIT.ALIGN_CENTER,
            $panel.width(), $panel.height(),
            $container.width(), $container.height()
        );
        $panel.css({
            left: fit.x,
            top: fit.y,
            width: fit.width,
            height: fit.height
        });
    };
    // initialize the widget.
    self.init();
};
