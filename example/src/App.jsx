import React, { Component } from "react";
import PdfViewer from "pdf-react";

import testPdf from "./static/test.pdf";
const testLink = "http://www.miller8.top/pdf-react/test2.pdf";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: testPdf,
    };
  }
  // "http://www.miller8.top/pdf-react/test3.pdf"
  render() {
    return (
      <div>
        <h1>pdf-react</h1>
        <button onClick={() => this.setState({ resource: testPdf })}>
          small file
        </button>
        <button onClick={() => this.setState({ resource: testLink })}>
          large file
        </button>
        <PdfViewer src={this.state.resource} showProgress={true} />
      </div>
    );
  }
}
