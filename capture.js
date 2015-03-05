var exec    = require('child_process').exec,
    del     = require('del'),
    Q       = require('q'),
    url     = 'http://localhost',
    timeout = "2000ms",
    mozilla,
    chrome;

if (process.argv.length > 2) {
  process.argv.slice(2, 4).forEach(function (val, index, array) {
    if (index === 0 && isUrl(val)) {
      url = val || url;
    } else if (index === 1 && isTimeout(val)) {
      timeout = val || timeout;
    }
  });

  Q.fcall(cleanScreenshots)
    .then(fetchMozilla)
    .then(fetchChrome)
    .then(function (status) {
      console.log("DONE!");
    })
    .catch(function (error) {
      console.log("ERROR! ", error);
    })
    .done();
}

function cleanScreenshots() {
  var deferred = Q.defer();
  del(['screenshots/*.png'], function (err, deletedFiles) {
    if (!err) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
  });
  return deferred.promise;
}

function fetchMozilla() {
  var deferred = Q.defer();
  mozilla = exec('./node_modules/phantomjs/bin/phantomjs mozilla.js ' + url + ' ' + timeout,
    function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      deferred.resolve(stdout);
  });
  return deferred.promise;
}

function fetchChrome() {
  var deferred = Q.defer();
  chrome = exec('./node_modules/casperjs/bin/casperjs chrome.js ' + url + ' ' + timeout,
    function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      deferred.resolve(stdout);
  });
  return deferred.promise;
}

function isUrl(url) {
  return url.match(/^https?:\/\//);
}

function isTimeout(timeout) {
  return timeout.match(/^\d{2, 6}ms$/);
}
