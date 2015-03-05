var casper = require('casper').create(),
    viewports = require('./viewports'),
    screenshotUrl,
    maxTimeout;

if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs chrome.js http://example.com 1000ms")
    .exit(1);
} else {
  screenshotUrl = casper.cli.args[0];
  maxTimeout = casper.cli.args[1] || "2000ms";
}

casper.start(screenshotUrl, function () {
  this.echo('Running chrome script for ' + this.getCurrentUrl(), 'info');
});

casper.each(viewports, function (casper, viewport) {
  this.then(function() {
    this.viewport(viewport.viewport.width, viewport.viewport.height);
  });
  this.thenOpen(screenshotUrl, function() {
    this.echo('[Chrome] Screenshot for ' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png', 'info');
    this.wait(getMaxTimeout(maxTimeout));
  });
  this.then(function(){
    this.capture('./screenshots/webkit-'+ viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png', {
      top: 0,
      left: 0,
      width: viewport.viewport.width,
      height: viewport.viewport.height
    });
  });
});

casper.run();

function getMaxTimeout(maxTimeoutMillisec) {
  return parseInt(maxTimeoutMillisec.slice(0, (maxTimeoutMillisec.length - 2)));
}
