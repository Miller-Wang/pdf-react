import React from "react";

export default function PdfViewer(props) {
  const { width = "100%", height = "100vh", onError, onLoad } = props;
  return (
    <div style={{ width, height }}>
      <embed
        onError={onError}
        onLoad={onLoad}
        src={props.src}
        style={{ width: "100%", height: "100%" }}
      ></embed>
    </div>
  );
}
