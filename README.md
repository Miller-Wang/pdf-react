# pdf-react

A simple pdf viewer for react

[![npm](https://img.shields.io/npm/v/pdf-react)](https://www.npmjs.com/package/pdf-react)
[![github](https://img.shields.io/github/stars/Miller-Wang/pdf-react?style=social)](https://github.com/Miller-Wang/pdf-react)

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
 * @param {boolean} isSerial
 * @param {number} page
 * @param {number} rotate 0 90 180 270
 * @param {boolean} hideArrow
 * @param {boolean} hidePageNum
 * @param {boolean} showProgress  when load large file, you can turn on and you will see the load progress
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

### Example: http://www.miller8.top/pdf-react/

### compare with react-pdf

At the begin i use react-pdf to render pdf files, but it has so much trouble, not only It's very troublesome to use, but also it make us bundle size larger 1~2M than before，here is the webpack-bundle-analyzer result

![react-pdf](http://www.miller8.top/pdf-react/react-pdf.png)

and this is our library webpack-bundle-analyzer result, only 200kb

![react-pdf](http://www.miller8.top/pdf-react/bundleImg.png)
