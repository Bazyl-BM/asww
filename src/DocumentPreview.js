import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

import { Modal } from "react-bootstrap";

import PdfDocument from "./PdfDocument";
import PdfControls from "./PdfControls";
import "./DocumentPreview.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pdf/build/annotation_layer_builder.css";

const noop = () => {};

export default class DocumentPreview extends React.PureComponent {
  static propTypes = {
    ...Modal.propTypes,
    fitTo: PropTypes.oneOf(["page", "width"]),
    toolbar: PropTypes.node
  };
  static defaultProps = {
    fitTo: "page",
    show: false,
    onClose: noop
  };
  static modalPropTypes = _.keys(Modal.propTypes);
  state = {
    scale: 1,
    loadedPages: {},
    first: 0,
    last: 8
  };

  constructor(props) {
    super(props);
    this.state.fitTo = props.fitTo;
    this.state.show = props.show;
  }

  handleDocumentLoaded = ({ numPages: pages }) => {
    this.setState({ page: 1, pages });
  };

  handlePageChange = (page) => this.setState({ page });
  handleFirstChange = (number) => this.setState({ first: number });
  handleLastChange = (number) => this.setState({ last: number });

  close = () => {
    this.setState({ show: false });
    this.props.onClose();
  };

  render() {
    const { fitTo, scale, pages: pageCount, show } = this.state;

    return (
      <div>
        <Modal
          {..._.pick(this.props, this.modalPropTypes)}
          className={`document-preview-modal fit-to-${fitTo}`}
          show={show}
        >
          <Modal.Header>
            <div>
              <Modal.Title>Modal heading</Modal.Title>
              {pageCount && (
                <div className="page-counter">
                  Strona
                  <input
                    className="page-input"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      this.handlePageChange(value);
                      this.handleFirstChange(value > 2 ? value - 2 : 0);

                      this.handleLastChange(value + 3);
                      window.setTimeout(() => {
                        var matches = document.querySelector(
                          `div[data-page-number='${value}']`
                        );
                        matches.scrollIntoView();
                      }, 50);
                    }}
                    value={this.state.page}
                    style={{
                      width: `${this.state.page > 9 ? "23px" : "15px"}`
                    }}
                  />
                  z {pageCount}
                </div>
              )}
            </div>
            <div className="toolbar">
              <button type="button" className="close" onClick={this.close}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <PdfDocument
              file={this.props.file}
              scale={scale}
              fitTo={fitTo}
              onLoad={this.handleDocumentLoaded}
              onPageChange={this.handlePageChange}
              setFirst={this.handleFirstChange}
              setLast={this.handleLastChange}
              first={this.state.first}
              last={this.state.last}
            />
          </Modal.Body>
          <PdfControls
            fitTo={fitTo}
            onZoomToFit={(fitTo) => this.setState({ scale: 1, fitTo })}
            onZoomIn={() => this.setState({ scale: scale * 1.1 })}
            onZoomOut={() =>
              this.setState({ scale: Math.max(0.1, scale * 0.9) })
            }
          />
        </Modal>
      </div>
    );
  }
}
