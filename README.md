# loader.js
Basic asset loader for Images, Scripts, Styles and Webfonts

## Usage

    var start = (new Date()).getTime();
  	var L = new Loader('#loader');
  	L.addImage('http://placekitten.com/500/500');
  	L.addImage('http://upload.wikimedia.org/wikipedia/commons/0/04/Dairy_cow.jpg');
  	L.addImages([
  		'http://placekitten.com/600/600',
  		'http://placekitten.com/400/400']);
  
  	L.addScript('http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js');
  	L.addScripts([
  		'https://raw.github.com/semu/denPen.js/master/js/editor.js',
  		'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js']);
  
  	L.addStyle('http://fonts.googleapis.com/css?family=Share+Tech');
  	L.addStyles([
  		'http://fonts.googleapis.com/css?family=Coda+Caption:800',
  		'http://fonts.googleapis.com/css?family=Joti+One']);
  
  	L.addFont('Share Tech');
  	L.addFonts([
  		'Coda Caption',
  		'Joti One']);
  
  	L.run(function() {
  		document.write("Loaded! Needed " + ((new Date()).getTime() - start)/1000 + " seconds.");
  	});
