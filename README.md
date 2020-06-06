# pdf-react

## A simple pdf viewer for react

### support print rotate zoom etc.

### support load local and remote pdf resource

## usage

### load network resource

```js
import PdfViewer from "pdf-react";

<PdfViewer src="http://exmple/test.pdf" width="500px" height="500px" />;
```

### load local resource

```js
import PdfViewer from "pdf-react";

const pdf = require("./static/1.pdf");

<PdfViewer src={pdf} width="500px" height="500px" />;
```
