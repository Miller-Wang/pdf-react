import React, { Component, createRef } from "react";
import "./index.css";

var pdfReader = require("./pdfReader.js").default;
var PDFJS = require("pdfjs-dist/build/pdf.min.js");

if (
  typeof window !== "undefined" &&
  "Worker" in window &&
  navigator.appVersion.indexOf("MSIE 10") === -1
) {
  var PdfjsWorker = require("worker-loader!pdfjs-dist/build/pdf.worker.js");
  PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

const { createLoadingTask, PDFJSWrapper } = pdfReader(PDFJS);

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

export default class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.subscriptions = {};
    this.canvas = createRef();
    this.annotationLayer = createRef();
    this.createLoadingTask = createLoadingTask;
    this.state = {
      page: 1,
      total: 1,
    };
  }

  // 触发监听事件
  $emit(name, ...args) {
    const fns = this.subscriptions[name];
    if (!fns || !fns.length) return;
    fns.forEach((fn) => fn(...args));
  }
  // 添加监听
  $on(name, event) {
    if (this.subscriptions.hasOwnProperty(name)) {
      // 已经订阅
      this.subscriptions[name].push(event);
    } else {
      this.subscriptions[name] = [event];
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const preProps = this.props;
    if (nextProps.src && preProps.src !== nextProps.src) {
      this.pdf.loadDocument(nextProps.src);
    }

    if (
      preProps.page !== nextProps.page &&
      nextProps.page > 0 &&
      nextProps.page <= this.state.total
    ) {
      this.pdf.loadPage(nextProps.page, nextProps.rotate);
    }
    if (preProps.rotate !== nextProps.rotate) {
      this.pdf.renderPage(nextProps.rotate);
    }
  }

  componentDidMount() {
    this.pdf = new PDFJSWrapper(
      this.canvas.current,
      this.annotationLayer.current,
      this.$emit.bind(this)
    );
    this.addEventListener();
    this.pdf.loadDocument(this.props.src);
  }

  addEventListener() {
    const {
      page,
      rotate,
      onLoaded,
      onProgress,
      onGetTotalPage,
      onLinkClick,
      onError,
      onPageSize,
    } = this.props;
    this.$on("loaded", () => {
      onLoaded && onLoaded();
      this.pdf.loadPage(page || this.state.page, rotate);
    });

    this.$on("progress", (progress) => {
      onProgress && onProgress(progress);
    });

    this.$on("num-pages", (total) => {
      this.setState({ total });
      onGetTotalPage && onGetTotalPage(total);
    });

    this.$on("page-size", (width, height) => {
      const canvasEle = this.canvas.current;
      canvasEle.style.height = canvasEle.offsetWidth * (height / width) + "px";
      onPageSize && onPageSize(width, height);
    });

    this.$on("error", (err) => {
      onError && onError(err);
    });

    this.$on("link-clicked", (pageNumber) => {
      console.log("link-clicked", pageNumber);
      onLinkClick && onLinkClick(pageNumber);
    });
  }

  componentWillUnmount() {
    this.pdf.destroy();
  }

  resize(size) {
    // check if the element is attached to the dom tree || resizeSensor being destroyed
    if (this.$el.parentNode === null || (size.width === 0 && size.height === 0))
      return;

    // on IE10- canvas height must be set
    this.canvas.current.style.height =
      this.canvas.current.offsetWidth *
        (this.canvas.current.height / this.canvas.current.width) +
      "px";
    // update the page when the resolution is too poor
    var resolutionScale = this.pdf.getResolutionScale();

    if (resolutionScale < 0.85 || resolutionScale > 1.15) {
      this.pdf.renderPage(this.rotate);
    }
  }

  print(dpi, pageList) {
    this.pdf.printPage(dpi, pageList);
  }

  prevPage() {
    const { page = this.state.page, onPageUpdate, rotate } = this.props;
    if (page > 1) {
      this.pdf.loadPage(page - 1, rotate);
      this.setState({ page: page - 1 });
      onPageUpdate && onPageUpdate(page - 1);
    }
  }

  nextPage() {
    const { page = this.state.page, onPageUpdate, rotate } = this.props;
    if (page < this.state.total) {
      this.pdf.loadPage(page + 1, rotate);
      this.setState({ page: page + 1 });
      onPageUpdate && onPageUpdate(page + 1);
    }
  }

  render() {
    let { page, total } = this.state;
    const { hidePageNum, hideArrow } = this.props;
    page = this.props.page || page;
    const canvasStyle = {
      display: "inline-block",
      width: "100%",
      height: "100%",
      verticalAlign: "top",
    };

    return (
      <>
        <div style={{ position: "relative", display: "block" }}>
          <canvas style={canvasStyle} ref={this.canvas}></canvas>
          <span
            ref={this.annotationLayer}
            className="annotationLayer"
            style={{ display: "inline-block", width: "100%", height: "100%" }}
          ></span>
        </div>
        {!hidePageNum && (
          <div style={{ textAlign: "center" }}>
            {!hideArrow && (
              <span className="page-arrow" onClick={this.prevPage.bind(this)}>
                {"<"}
              </span>
            )}
            {`${page} / ${total}`}
            {!hideArrow && (
              <span className="page-arrow" onClick={this.nextPage.bind(this)}>
                {">"}
              </span>
            )}
          </div>
        )}
      </>
    );
  }
}
