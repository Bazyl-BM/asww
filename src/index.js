import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import DocumentPreview from "./DocumentPreview";
import FillerContent from "./FillerContent";
import pdf from "./statut_s.06e5bed4.pdf";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles}>
      <Button bsStyle="primary" onClick={setIsOpen(true)}>
        Show Multi Page Pdf
      </Button>

      <FillerContent />
      {isOpen && (
        <DocumentPreview
          show={isOpen}
          file={pdf}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
