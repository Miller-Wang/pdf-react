# pdf-react

A simple pdf viewer for react

### support print rotate zoom etc.

### support load local and remote pdf resource

## usage

### load network resource

```js
import PdfViewer from "pdf-react";

<PdfViewer src="http://exmple/test.pdf" />;
```

### load local resource

```js
import PdfViewer from "pdf-react";

import pdf from "./static/1.pdf";

<PdfViewer src={pdf} />;
```
