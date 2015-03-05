# Frontend multi viewport capturer

### Intro

Weightless NodeJS script to take screenshots of your website, to test its UI according to the viewport size and the type of browser.

### Support

This script allows regular and webkit simulated browsers to try different rendering on those engines. It uses [PhantomJS](http://phantomjs.org) and [CasperJS](http://casperjs.org) to render both.

### Usage

- Clone the repository. Yep, basically.  
- Run `$ npm install`, it will install phantomjs and casperjs if you don't have them.    
- Fill the `viewports.js` file with the different resolutions and device name you'd like to test in both of the browsers.  
- Then, simply run `$ node capture.js http://yourwebsite.com 2000ms`.  
- It might take a while, go grab a coffee, but once it's done, you'll get all the desired captures in `screenshots`.  

_Parameters_:  
- The website to scrapp.  
- The max timeout you'd like to accept to render the target page. __(in ms)__.  

### About

Hey, I'm [Pierre Guilhou](http://pierreguilhou.me), a french full stack developer.

- [LinkedIn](http://linkedin.com/in/pierreguilhou)  
- [Angel List](https://angel.co/pierre-guilhou)  
- [Github](http://github.com/Pygocentrus)  
