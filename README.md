# FHIRWorks

FHIRWorks is a browser extension that brings some features like visualizing FHIR resources, etc.

## Features
* **PlantUML diagram generation** - from a FHIR logical model page in an IG, the extension can create a PlantUML rendering.
* ...

### Upcoming
* (ideas? Please check or add [issues](https://github.com/costateixeira/FHIRWorks/issues)


## Installation

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension will now be installed and available in your Chrome toolbar.

## Usage

1. Navigate to a webpage that contains a FHIR JSON resource.
2. Click on the **FHIRWorks** extension icon in your toolbar.
3. The extension will attempt to load the JSON resource from the current page.
4. If successful, you can generate and copy a PlantUML diagram.
5. The extension also provides an option to open the encoded PlantUML URL in a new tab.

## Dependencies

This extension relies on the following libraries:
- **pako.js** for zlib compression.
- **js-yaml.js** for YAML parsing.
- **plantuml-encoder.js** for PlantUML encoding.

## License

This project is licensed under the **Creative Commons** license.
