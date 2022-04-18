import React from "react";
import PropTypes from "prop-types";
import { Document } from "./ReactPdf";
import PageList from "./PageList";
import "./PdfDocument.css";
const noop = () => {};

export default class PdfDocument extends React.PureComponent {
  static propTypes = {
    file: PropTypes.string.isRequired,
    scale: PropTypes.number,
    fitTo: PropTypes.oneOf(["page", "width"]),
    onLoad: PropTypes.func,
    onPageChange: PropTypes.func
  };
  static defaultProps = {
    scale: 1.3,
    fitTo: "page",
    onLoad: noop,
    onPageChange: noop
  };
  state = {
    document: {}
  };
  handleDocumentLoaded = (document) => {
    this.setState({ document });
    console.log("Ssa");
    this.props.onLoad(document);
  };
  render() {
    const { numPages } = this.state.document;
    const {
      file,
      scale,
      fitTo,
      onPageChange,
      setFirst,
      setLast,
      first,
      last
    } = this.props;
    return (
      <div className="document-container" ref={(e) => (this.container = e)}>
        {
          <Document
            file={file}
            loading={<p style={{ color: "red", fontSize: "50px" }}>Alallaa</p>}
            onLoadSuccess={this.handleDocumentLoaded}
          >
            <PageList
              container={this.container}
              pageCount={numPages}
              scale={scale}
              fitTo={fitTo}
              onPageChange={onPageChange}
              setFirst={setFirst}
              setLast={setLast}
              first={first}
              last={last}
            />
          </Document>
        }
      </div>
    );
  }
}
