var async = require('async'),
    system = require('system'),
    viewports = require('./viewports'),
    args = system.args,
    screenshotUrl = args[1],
    maxTimeout = args[2] || "2000ms";

function capture(sizes, callback) {
  var page = require('webpage').create();
  page.viewportSize = {
    width: sizes['viewport'].width,
    height: sizes['viewport'].height
  };
  page.zoomFactor = 1;
  page.open(screenshotUrl, function (status) {
    var filename = sizes['name'] + '-' + sizes['viewport'].width + 'x' + sizes['viewport'].height + '.png';
    console.log('[Mozilla] Screenshot for ' + filename);
    window.setTimeout(function () {
      page.render('./screenshots/' + filename);
      page.close();
      callback.apply();
    }, getMaxTimeout(maxTimeout));
  });
  page.onError = function(msg, trace) {};
}

if (screenshotUrl) {
  console.log('Running mozilla script for ' + screenshotUrl);

  async.eachSeries(viewports, capture, function (e) {
    if (e) console.log(e);
    phantom.exit();
  });
} else {
  console.log("Usage: $ phantomjs mozilla.js http://example.com 1000ms")
}

function getMaxTimeout(maxTimeoutMillisec) {
  return parseInt(maxTimeoutMillisec.slice(0, (maxTimeoutMillisec.length - 2)));
}
