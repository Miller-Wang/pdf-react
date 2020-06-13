# pdf-react

A simple pdf viewer for react

### support print rotate zoom etc.

### support load local and remote pdf resource

## usage

```js
npm i pdf-react
npm i worker-loader -D
```

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

## props

```js
/**
 * props
 * @param {string} src
 * @param {number} page
 * @param {boolean} hideArrow
 * @param {boolean} hidePageNum
 * @param {func} onLoaded
 * @param {func} onPageUpdate
 * @param {func} onGetTotalPage
 * @param {func} onError
 * @param {func} onProgress
 * @param {func} onPageSize
 * @param {func} onLinkClick
 */
```

## print function

```js
  constructor(props) {
    super(props);
    this.pdfViewer = React.createRef();
  }

  /**
   * @param {string} dpi  optional default: 150
   * @param {arr} pageList  optional  example: [1, 2, 3]
   */
  onPrint(dpi, pageList){
    this.pdfViewer.current.print(200, [1]);
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        <button onClick={this.onPrint.bind(this)}>Print</button>
        <PdfViewer src={pdfResource} ref={this.pdfViewer} />
      </div>
    );
  }

```
