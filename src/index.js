"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var oldConsoleError = console.error;

console.error = function () {
  for (
    var _len = arguments.length, rests = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    rests[_key] = arguments[_key];
  }

  if (rests[0] && rests[0].startsWith("getGlobalEventBus is deprecated"))
    return;
  oldConsoleError.apply(void 0, rests);
};

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

var _pdfReader = pdfReader(PDFJS),
  createLoadingTask = _pdfReader.createLoadingTask,
  PDFJSWrapper = _pdfReader.PDFJSWrapper; // 0 - 1

function Progress(_ref) {
  var _ref$progress = _ref.progress,
    progress = _ref$progress === void 0 ? 0 : _ref$progress;
  var progressStyle = {
    strokeDashoffset: "".concat(-252 + progress * 252, "px"),
  };
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: "pdf-react-progress",
    },
    /*#__PURE__*/ _react.default.createElement(
      "svg",
      {
        viewBox: "0 0 100 100",
      },
      /*#__PURE__*/ _react.default.createElement("path", {
        d: "M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0",
        fill: "none",
        stroke: "#e5e9f2",
        "stroke-width": "4",
      }),
      /*#__PURE__*/ _react.default.createElement("path", {
        d: "M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0",
        fill: "none",
        stroke: "#20a0ff",
        "stroke-linecap": "round",
        className: "progress-svg-path",
        transform: "rotate(90,50,50)",
        "stroke-width": "4",
        style: progressStyle,
      })
    )
  );
}
/**
 * props
 * @param {string} src
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

var PDFViewer = /*#__PURE__*/ (function (_Component) {
  _inherits(PDFViewer, _Component);

  var _super = _createSuper(PDFViewer);

  function PDFViewer(props) {
    var _this;

    _classCallCheck(this, PDFViewer);

    _this = _super.call(this, props);
    _this.subscriptions = {};
    _this.canvas = /*#__PURE__*/ (0, _react.createRef)();
    _this.annotationLayer = /*#__PURE__*/ (0, _react.createRef)();
    _this.createLoadingTask = createLoadingTask;
    _this.state = {
      page: 1,
      total: 1,
      progress: 0,
    };
    return _this;
  } // 触发监听事件

  _createClass(PDFViewer, [
    {
      key: "$emit",
      value: function $emit(name) {
        for (
          var _len2 = arguments.length,
            args = new Array(_len2 > 1 ? _len2 - 1 : 0),
            _key2 = 1;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2 - 1] = arguments[_key2];
        }

        var fns = this.subscriptions[name];
        if (!fns || !fns.length) return;
        fns.forEach(function (fn) {
          return fn.apply(void 0, args);
        });
      }, // 添加监听
    },
    {
      key: "$on",
      value: function $on(name, event) {
        if (this.subscriptions.hasOwnProperty(name)) {
          // 已经订阅
          this.subscriptions[name].push(event);
        } else {
          this.subscriptions[name] = [event];
        }
      },
    },
    {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var preProps = this.props;

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
      },
    },
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.pdf = new PDFJSWrapper(
          this.canvas.current,
          this.annotationLayer.current,
          this.$emit.bind(this)
        );
        this.addEventListener();
        this.pdf.loadDocument(this.props.src);

        if (this.annotationLayer.current) {
          this.addresize(this.annotationLayer.current, this.resize.bind(this));
        }
      },
    },
    {
      key: "addEventListener",
      value: function addEventListener() {
        var _this2 = this;

        var _this$props = this.props,
          page = _this$props.page,
          rotate = _this$props.rotate,
          onLoaded = _this$props.onLoaded,
          onProgress = _this$props.onProgress,
          onGetTotalPage = _this$props.onGetTotalPage,
          onLinkClick = _this$props.onLinkClick,
          onError = _this$props.onError,
          onPageSize = _this$props.onPageSize;
        this.$on("loaded", function () {
          onLoaded && onLoaded();

          _this2.pdf.loadPage(page || _this2.state.page, rotate);
        });
        this.$on("progress", function (progress) {
          onProgress && onProgress(progress);

          _this2.setState({
            progress: progress,
          });
        });
        this.$on("num-pages", function (total) {
          _this2.setState({
            total: total,
          });

          onGetTotalPage && onGetTotalPage(total);
        });
        this.$on("page-size", function (width, height) {
          var canvasEle = _this2.canvas.current;
          canvasEle.style.height =
            canvasEle.offsetWidth * (height / width) + "px";
          onPageSize && onPageSize(width, height);
        });
        this.$on("error", function (err) {
          onError && onError(err);
        });
        this.$on("link-clicked", function (pageNumber) {
          onLinkClick && onLinkClick(pageNumber);
        });
      },
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.pdf.destroy();
      },
    },
    {
      key: "addresize",
      value: function addresize(dom, fn) {
        var w = dom.offsetWidth,
          h = dom.offsetHeight,
          oldfn = window.onresize;

        if (oldfn) {
          window.onresize = function () {
            oldfn.call(window);

            if (dom.offsetWidth != w || dom.offsetHeight != h) {
              w = dom.offsetWidth;
              h = dom.offsetHeight;
              fn(dom);
            }
          };
        } else {
          window.onresize = function () {
            if (dom.offsetWidth != w || dom.offsetHeight != h) {
              w = dom.offsetWidth;
              h = dom.offsetHeight;
              fn(dom);
            }
          };
        }
      },
    },
    {
      key: "resize",
      value: function resize(dom) {
        // IE 10
        if (!window.Promise) {
          var canvasEle = this.canvas.current;
          canvasEle.style.height =
            canvasEle.offsetWidth * (canvasEle.height / canvasEle.width) + "px";
        } // update

        var resolutionScale = this.pdf.getResolutionScale();

        if (resolutionScale < 0.85 || resolutionScale > 1.15) {
          this.pdf.renderPage(this.rotate);
        }
      },
    },
    {
      key: "print",
      value: function print(dpi, pageList) {
        this.pdf.printPage(dpi, pageList);
      },
    },
    {
      key: "prevPage",
      value: function prevPage() {
        var _this$props2 = this.props,
          _this$props2$page = _this$props2.page,
          page =
            _this$props2$page === void 0 ? this.state.page : _this$props2$page,
          onPageUpdate = _this$props2.onPageUpdate,
          rotate = _this$props2.rotate;

        if (page > 1) {
          this.pdf.loadPage(page - 1, rotate);
          this.setState({
            page: page - 1,
          });
          onPageUpdate && onPageUpdate(page - 1);
        }
      },
    },
    {
      key: "nextPage",
      value: function nextPage() {
        var _this$props3 = this.props,
          _this$props3$page = _this$props3.page,
          page =
            _this$props3$page === void 0 ? this.state.page : _this$props3$page,
          onPageUpdate = _this$props3.onPageUpdate,
          rotate = _this$props3.rotate;

        if (page < this.state.total) {
          this.pdf.loadPage(page + 1, rotate);
          this.setState({
            page: page + 1,
          });
          onPageUpdate && onPageUpdate(page + 1);
        }
      },
    },
    {
      key: "render",
      value: function render() {
        var _this$state = this.state,
          page = _this$state.page,
          total = _this$state.total,
          progress = _this$state.progress;
        var _this$props4 = this.props,
          hidePageNum = _this$props4.hidePageNum,
          hideArrow = _this$props4.hideArrow,
          showProgress = _this$props4.showProgress;
        page = this.props.page || page;
        return /*#__PURE__*/ _react.default.createElement(
          "div",
          {
            className: "pdf-react-container",
          },
          /*#__PURE__*/ _react.default.createElement("canvas", {
            ref: this.canvas,
            className: "pdf-react-canvas",
          }),
          /*#__PURE__*/ _react.default.createElement("span", {
            ref: this.annotationLayer,
            className: "annotationLayer",
          }),
          total &&
            !hidePageNum &&
            /*#__PURE__*/ _react.default.createElement(
              "div",
              {
                style: {
                  textAlign: "center",
                },
                className: "pdf-react-pager",
              },
              !hideArrow &&
                /*#__PURE__*/ _react.default.createElement(
                  "span",
                  {
                    className: "pdf-react-arrow",
                    onClick: this.prevPage.bind(this),
                  },
                  "<"
                ),
              "".concat(page, " / ").concat(total),
              !hideArrow &&
                /*#__PURE__*/ _react.default.createElement(
                  "span",
                  {
                    className: "pdf-react-arrow",
                    onClick: this.nextPage.bind(this),
                  },
                  ">"
                )
            ),
          showProgress &&
            progress > 0 &&
            progress < 1 &&
            /*#__PURE__*/ _react.default.createElement(Progress, {
              progress: progress,
            })
        );
      },
    },
  ]);

  return PDFViewer;
})(_react.Component);

exports.default = PDFViewer;
