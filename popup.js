document.addEventListener("DOMContentLoaded", function() {
  const button3 = document.getElementById("pumlbtn");
  let jsonData;

  loadCurrentJSON();

  function loadCurrentJSON() {
    // Get the current tab and retrieve its URL
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      let currentTab = tabs[0];
      let url = currentTab.url;

      // If the URL ends with ".json", no need to replace, just use it as is
      let jsonUrl = url;
      if (url.endsWith(".html")) {
        jsonUrl = url.replace(/\.html$/, '.json');
      }

      // Try fetching the JSON file
      fetch(jsonUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(json => {
          // If successful, store the JSON in local storage and enable the button
          localStorage.setItem("jsonLM", JSON.stringify(json));
          jsonData = json;
          button3.disabled = false; // Enable the button
          button3.style.backgroundColor = '#10897d'; // Set to active color
        })
        .catch(error => {
          console.error("Error fetching JSON:", error);
          button3.disabled = true; // Disable the button
          button3.style.backgroundColor = '#d3d3d3'; // Set to gray color
        });
    });
  }

  button3.addEventListener("click", function() {
    const jsonData = JSON.parse(localStorage.getItem("jsonLM"));

    if (jsonData) {
      copyTextToClipboard(fhirToPlantUML(jsonData));
      window.open(encodePlantUML(fhirToPlantUML(jsonData)));
      alert("Copied the PlantUML text to the clipboard");

//      console.log(encodePlantUML(fhirToPlantUML(jsonData)));
    } else {
      alert("No JSON object has been uploaded");
    }
  });

});

function copyTextToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function encodePlantUML(umlCode) {
  const compressed = pako.deflate(umlCode, { level: 9 }); // Use pako to deflate (compress)
  const base64Encoded = btoa(String.fromCharCode.apply(null, compressed));
  const base64Url = base64Encoded.replace(/\+/g, "-").replace(/\//g, "_");

  return composePlantUmlUrl(umlCode);;
}


function fhirToPlantUML(fhirJson) {
  let plantUML = "@startuml\nskinparam linetype polyline\nhide circle\nhide stereotype\n\nclass \"**" + fhirJson.name + "**\" as " + fhirJson.name + " {\n";

  for (let i = 0; i < fhirJson.differential.element.length; i++) {
    let element = fhirJson.differential.element[i];
    let path = element.path.split(".");
    if (path.length > 1) {
      let tabs = "  ";
      for (let j = 1; j < path.length - 1; j++) {
        tabs += "  ";
      }
      plantUML += tabs + "|_ " + path[path.length - 1] + " " + element.min + ".." + element.max + "   \n";
    }
  }

  plantUML += "}\n@enduml";
  return plantUML;
}


