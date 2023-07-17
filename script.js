$('document').ready(()=>{

  ace.require("ace/ext/language_tools");
  // Initialize the HTML editor
  var htmlEditor = ace.edit("html-editor");
  htmlEditor.setTheme("ace/theme/twilight");
  htmlEditor.getSession().setMode("ace/mode/html");
  htmlEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: true,
  });

  // Initialize the CSS editor
  var cssEditor = ace.edit("css-editor");
  cssEditor.setTheme("ace/theme/twilight");
  cssEditor.getSession().setMode("ace/mode/css");
  cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: true,
  });

  // Initialize the JavaScript editor
  var jsEditor = ace.edit("js-editor");
  jsEditor.setTheme("ace/theme/twilight");
  jsEditor.getSession().setMode("ace/mode/javascript");
  jsEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: true,
      });

  // Function to get the combined code from the editors
  function getCombinedCode() {
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();
    return (
      "<html><head><style>" +
      cssCode +
      "</style></head><body>" +
      htmlCode +
      "<script>" +
      jsCode +
      "</script></body></html>"
    );
  }

    // Run button click event
    $("#run").click(function() {
        var combinedCode = getCombinedCode();
        $("#output")[0].contentWindow.document.open();
        $("#output")[0].contentWindow.document.write(combinedCode);
        $("#output")[0].contentWindow.document.close();
        
            // Scroll to the output section
        var outputContainer = document.getElementById("output");
        var offsetTop = outputContainer.offsetTop;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });



      });
    
 

      // Initially load the output with default code
      var initialCode = getCombinedCode();
      $("#output")[0].contentWindow.document.open();
      $("#output")[0].contentWindow.document.write(initialCode);
      $("#output")[0].contentWindow.document.close();


})