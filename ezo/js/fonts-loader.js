(function () {
  "use strict";
  var css_href = './fonts/fonts.css';
  function on(el, ev, callback) {
    if (el.addEventListener) {
      el.addEventListener(ev, callback, false);
    } else if (el.attachEvent) {
      el.attachEvent("on" + ev, callback);
    }
  }

  if ((window.localStorage && localStorage.font_css_cache) || document.cookie.indexOf('font_css_cache') > -1){
    injectFontsStylesheet();
  } else {
    on(window, "load", injectFontsStylesheet);
  }

  function fileIsCached(href) {
    return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
  }

  function injectFontsStylesheet() {
    if (!window.localStorage || !window.XMLHttpRequest) {
      var stylesheet = document.createElement('link');
      stylesheet.href = css_href;
      stylesheet.rel = 'stylesheet';
      stylesheet.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(stylesheet);
      document.cookie = "font_css_cache";
    } else {
      if (fileIsCached(css_href)) {
        injectRawStyle(localStorage.font_css_cache);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", css_href, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            injectRawStyle(xhr.responseText);
            localStorage.font_css_cache = xhr.responseText;
            localStorage.font_css_cache_file = css_href;
          }
        };
        xhr.send();
      }
    }
  }

  function injectRawStyle(text) {
    var style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (style.styleSheet) {
        style.styleSheet.cssText = text;
    } else {
        style.innerHTML = text;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }

}());
