'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      {content: text , description: "Search python docs for " + text},
      {content: "func " +  text , description: "Open docs for function " + text},
      {content: "attr " + text , description: "Open docs for attribute " + text},
      {content: "cls " + text , description: "Open docs for class " + text},
      {content: "module " + text, description: "Open docs for module " + text}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(
    function(text){
        var newUrl = "";
        var words = text.split(" ");
        var command = words[0];
        var params = ""
        var version = localStorage['python_version_doc_search'];

        if((words.length) > 1) {
            params = words[1];
            params = params.split(".").map(function(str) {
                return str.toLowerCase();
            }).join(".");
        }
        if(command == "module") {
            newUrl = "http://docs.python.org/"+version+"/library/"+params;
        }
        else if(["function", "func", "attribute", "attr", "class", "cls"].indexOf(command) != -1) {
            var module = params.split(".");
            module.pop();
            module = module.join(".");
            newUrl = "http://docs.python.org/"+version+"/library/"+module+".html#"+params;
        }
        else{
            newUrl = "http://docs.python.org/"+version+"/search.html?q="+text+"&check_keywords=yes&area=default";
        }

        chrome.tabs.update({url: newUrl});
    }); 
