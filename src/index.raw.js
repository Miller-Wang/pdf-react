import React, { Component, createRef } from "react";
import "./index.css";
const pdfReader = require("./pdfReader.js").default;
const PDFJS = require("pdfjs-dist/build/pdf.min.js");

const oldConsoleError = console.error;
console.error = (...rests) => {
  if (rests[0] && rests[0].startsWith("getGlobalEventBus is deprecated"))
    return;
  oldConsoleError(...rests);
};

if (
  typeof window !== "undefined" &&
  "Worker" in window &&
  navigator.appVersion.indexOf("MSIE 10") === -1
) {
  const PdfjsWorker = require("worker-loader!pdfjs-dist/build/pdf.worker.js");
  PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

const { createLoadingTask, PDFJSWrapper } = pdfReader(PDFJS);

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
      progress: 0,
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
      this.pdf.loadPage(0);
      if (this.props.isSerial) {
        this.pdf.clearSeriesPage();
      }
      this.pdf.loadDocument(nextProps.src);
      this.setState({ page: 1, total: 1, progress: 0 });
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
      this.$emit.bind(this),
      this.props.isSerial
    );
    this.addEventListener();
    this.pdf.loadDocument(this.props.src);
    if (this.annotationLayer.current && !this.props.isSerial) {
      this.addresize(this.annotationLayer.current, this.resize.bind(this));
    }
  }

  addEventListener() {
    const {
      isSerial,
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
      !isSerial && this.pdf.loadPage(page || this.state.page, rotate);
    });

    this.$on("progress", (progress) => {
      onProgress && onProgress(progress);
      this.setState({ progress });
    });

    this.$on("num-pages", (total) => {
      this.setState({ total });
      onGetTotalPage && onGetTotalPage(total);
    });

    this.$on("page-size", (width, height) => {
      // const canvasEle = this.canvas.current;
      // canvasEle.style.height = canvasEle.offsetWidth * (height / width) + "px";
      onPageSize && onPageSize(width, height);
    });

    this.$on("error", (err) => {
      onError && onError(err);
    });

    this.$on("link-clicked", (pageNumber) => {
      onLinkClick && onLinkClick(pageNumber);
    });
  }

  componentWillUnmount() {
    this.pdf.destroy();
  }

  addresize(dom, fn) {
    let w = dom.offsetWidth,
      h = dom.offsetHeight,
      oldfn = window.onresize;
    if (oldfn) {
      window.onresize = () => {
        oldfn.call(window);
        if (dom.offsetWidth != w || dom.offsetHeight != h) {
          w = dom.offsetWidth;
          h = dom.offsetHeight;
          fn(dom);
        }
      };
    } else {
      window.onresize = () => {
        if (dom.offsetWidth != w || dom.offsetHeight != h) {
          w = dom.offsetWidth;
          h = dom.offsetHeight;
          fn(dom);
        }
      };
    }
  }

  resize(dom) {
    // IE 10
    if (!window.Promise) {
      const canvasEle = this.canvas.current;
      canvasEle.style.height =
        canvasEle.offsetWidth * (canvasEle.height / canvasEle.width) + "px";
    }

    // update
    const resolutionScale = this.pdf.getResolutionScale();
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

  renderPagination() {
    const { hidePageNum, hideArrow, isSerial } = this.props;
    if (isSerial) return null;
    const { page = this.state.page } = this.props;
    const { total } = this.state;
    return (
      <>
        {total && !hidePageNum && (
          <div style={{ textAlign: "center" }} className="pdf-react-pager">
            {!hideArrow && (
              <span
                className="pdf-react-arrow"
                onClick={this.prevPage.bind(this)}
              >
                {"<"}
              </span>
            )}
            {`${page} / ${total}`}
            {!hideArrow && (
              <span
                className="pdf-react-arrow"
                onClick={this.nextPage.bind(this)}
              >
                {">"}
              </span>
            )}
          </div>
        )}
      </>
    );
  }

  renderProgress() {
    const { showProgress, isSerial } = this.props;
    let { progress } = this.state;
    if (!showProgress || isSerial) return null;
    if (progress === 0 || progress === 1) return null;
    return <Progress progress={progress} />;
  }

  render() {
    return (
      <div className="pdf-react-container">
        <canvas ref={this.canvas} className="pdf-react-canvas"></canvas>
        <span ref={this.annotationLayer} className="annotationLayer"></span>
        {this.renderPagination()}
        {this.renderProgress()}
      </div>
    );
  }
}

// 0 - 1
function Progress({ progress = 0 }) {
  const progressStyle = {
    strokeDashoffset: `${-252 + progress * 252}px`,
  };
  return (
    <div className="pdf-react-progress">
      <svg viewBox="0 0 100 100">
        <path
          d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          stroke="#e5e9f2"
          strokeWidth="4"
        ></path>
        <path
          d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          stroke="#20a0ff"
          strokeLinecap="round"
          className="progress-svg-path"
          transform="rotate(90,50,50)"
          strokeWidth="4"
          style={progressStyle}
        ></path>
      </svg>
    </div>
  );
}
