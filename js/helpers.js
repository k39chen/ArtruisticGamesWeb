// helper method to render an EJS

/**
 * Renders an EJS template onto the binding selector
 * with the provided EJS file path and parameters.
 *
 * @namespace $
 * @method render
 * @param url {String} The file path of the template we want to render.
 * @param params {Object} Any additional parameters that we want to render the EJS with.
 */
$.fn.render = function(url, params) {
    var html = new EJS({url: url}).render(params || {});
    return $(this).html(html);
};
