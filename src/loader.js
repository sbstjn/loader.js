var Loader = function(container) {
  this.files = {images: [], scripts: [], fonts: [], styles: []};
  this.counter = 0;
  this.loaded = 0;
  this.container = document.querySelector(container);
};

Loader.prototype.done = function() {
  this.loaded++;

  if (this.loaded === this.counter) {
    this.callback();
  }
};

Loader.prototype.loadImages = function() {
  var that = this;

  var load = function(url) {
    try {
      var rdy = false;
      var img = new Image();
      img.src = url;

      img.onload = img.onreadystatechange = function() {
        if (!rdy && (!this.readyState || this.readyState === 'complete')) {
          rdy = true;
          
          that.done();
        }
      };

    } catch (e) { }
  };

  for (var n = this.files.images.length-1; n >= 0; n--) {
    load(this.files.images[n]);
  }
};

Loader.prototype.loadScripts = function() {
  var that = this;

  var load = function(url) {
    var rdy = false;
    var scr = document.createElement('script');
    scr.src = url;

    scr.onload = scr.onreadystatechange = function() {
      if (!rdy && (!this.readyState || this.readyState === 'complete')) {
        rdy = true;
        
        that.done();
        scr.parentNode.removeChild(scr);
      }
    };

    document.getElementsByTagName('head')[0].appendChild(scr);
  };

  for (var n = this.files.scripts.length-1; n >= 0; n--) {
    load(this.files.scripts[n]);
  }
};

Loader.prototype.loadStyles = function() {
  var that = this;

  var load = function(url) {
    var b = document.createElement('div');
    b.innerHTML = '<link href=\'' + url + '\' rel=\'stylesheet\' type=\'text/css\'>';
    var lnk = b.querySelector('link');
    var rdy = false;

    lnk.onload = lnk.onreadystatechange = function() {
      if (!rdy && (!this.readyState || this.readyState === 'complete')) {
        rdy = true;
        
        that.done();
      }
    };

    document.getElementsByTagName('body')[0].appendChild(b);
  };

  for (var n = this.files.styles.length-1; n >= 0; n--) {
    load(this.files.styles[n]);
  }
};

Loader.prototype.loadFonts = function() {
  var that = this;

  var load = function(name) {
    var b  = document.createElement('div');
    var s1 = document.createElement('span');
    var s2 = document.createElement('span');
    var interval;

    s1.innerHTML = 'The quick brown fox jumps over the lazy dog';
    s2.innerHTML = 'The quick brown fox jumps over the lazy dog';

    s1.style.fontFamily = '\'' +  name+ '\', serif';
    s2.style.fontFamily = 'serif';

    b.appendChild(s1);
    b.appendChild(s2);

    document.getElementsByTagName('body')[0].appendChild(b);

    interval = setInterval(function() {
      if (s1.offsetWidth !== s2.offsetWidth) {
        clearInterval(interval);

        s1.parentNode.parentNode.removeChild(s1.parentNode);
        that.done();
      }
    }, 50);

    setTimeout(function() {
      if (interval) {
        clearInterval(interval);
      }
    }, 10000);
  };

  for (var n = this.files.fonts.length-1; n >= 0; n--) {
    load(this.files.fonts[n]);
  }
};

Loader.prototype.run = function(callback) {
  this.callback = callback;

  this.loadImages();
  this.loadScripts();
  this.loadStyles();
  this.loadFonts();
};

Loader.prototype.addFile = function(type, url) {
  this.files[type].push(url);
  this.counter++;
};

Loader.prototype.addImage = function(url) {
  this.addFile('images', url);
};

Loader.prototype.addImages = function(list) {
  for (var n = list.length-1; n >= 0; n--) {
    this.addImage(list[n]);
  }
};

Loader.prototype.addScript = function(url) {
  this.addFile('scripts', url);
};

Loader.prototype.addScripts = function(list) {
  for (var n = list.length-1; n >= 0; n--) {
    this.addScript(list[n]);
  }
};

Loader.prototype.addStyle = function(url) {
  this.addFile('styles', url);
};

Loader.prototype.addStyles = function(list) {
  for (var n = list.length-1; n >= 0; n--) {
    this.addStyle(list[n]);
  }
};

Loader.prototype.addFont = function(url) {
  this.addFile('fonts', url);
};

Loader.prototype.addFonts = function(list) {
  for (var n = list.length-1; n >= 0; n--) {
    this.addFont(list[n]);
  }
};