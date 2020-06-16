import React, { Component } from "react";
import PdfViewer from "pdf-react";
import "./index.css";

import testPdf from "./static/test.pdf";
const testLink = "http://www.miller8.top/pdf-react/demo.pdf";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 1,
      pdf: testPdf,
      mode: 1,
    };
  }

  changeMode(mode) {
    this.state.mode !== mode && this.setState({ mode });
  }

  onPageUpdate(page) {
    this.setState({ page });
  }

  onGetTotalPage(total) {
    this.setState({ total });
  }

  render() {
    const { pdf, mode, page, total } = this.state;
    return (
      <div>
        <h1>pdf-react</h1>
        <button onClick={() => this.changeMode(1)}>Mode-1</button>
        <button onClick={() => this.changeMode(2)}>Mode-2</button>
        <button onClick={() => this.changeMode(3)}>Mode-3</button>
        <button onClick={() => this.changeMode(4)}>Mode-4</button>

        {/* ---------demo 1-------- */}
        {mode === 1 && <PdfViewer src={pdf} />}

        {/* ---------demo 2-------- */}
        {mode === 2 && <PdfViewer src={testLink} showProgress={true} />}

        {/* ---------demo 3-------- */}
        {mode === 3 && <PdfViewer src={pdf} isSerial={true} />}
        {/* ---------demo 4-------- */}
        {mode === 4 && (
          <>
            <PdfViewer
              src={pdf}
              showProgress={true}
              page={this.state.page}
              onPageUpdate={this.onPageUpdate.bind(this)}
              onGetTotalPage={this.onGetTotalPage.bind(this)}
            />
            <button
              onClick={() =>
                this.setState({ page: page > 1 ? page - 1 : page })
              }
            >
              上一页
            </button>
            <button
              onClick={() =>
                this.setState({ page: page < total ? page + 1 : page })
              }
            >
              下一页
            </button>
          </>
        )}
      </div>
    );
  }
}
