(function () {
  'use strict';

  var csInterface = new CSInterface();

  csInterface.addEventListener('com.init', function(evt) {
    console.log("Initializing console");
  });

  csInterface.addEventListener('console', function(evt) {
    // console.log('JSX: ' + evt.data);
  });

  csInterface.addEventListener('com.playwrite.answer', function(evt) {
    // var data = trimEdges(evt.data, 1);
    console.log(evt);
  });

  csInterface.addEventListener('mighty.rollcall', function(evt) {
    dispatchEvent('mighty.rollanswer', extFolder())
  });

  function dispatchEvent(name, data) {
  	var event = new CSEvent(name, 'APPLICATION');
  	event.data = data;
  	csInterface.dispatchEvent(event);
  }

  csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", log);
    function log(event){
    console.log(event);
  }

}());
