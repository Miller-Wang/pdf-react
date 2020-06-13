import React, { Component } from "react";
import PdfViewer from "pdf-react";

import testPdf from "./static/test.pdf";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>pdf-react</h1>
        <PdfViewer src={testPdf} />
      </div>
    );
  }
}
