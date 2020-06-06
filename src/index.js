import React, { Component } from "react";
import ReactDOM from "react-dom";
import Viewer from "./PdfViewer";

const pdf = require("./demo.pdf").default;

const props = {
  src: pdf,
  onError: (err) => {
    console.log("onError", err);
  },
  onLoad: () => {
    console.log("onLoad");
  },
};

ReactDOM.render(<Viewer {...props} />, document.getElementById("app"));
