import React from "react";
import Fab from "@material-ui/core/Fab";
import { ReactComponent as BarcodeIcon } from "./barcode.svg";

interface IBCProps {
  openScanner: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const BarcodeStartScanButton = (props: IBCProps) => {
  return (
    <Fab
      color="secondary"
      onClick={props.openScanner}
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        margin: "0 1em 1em 1em",
      }}
    >
      <BarcodeIcon />
    </Fab>
  );
};

export default BarcodeStartScanButton;
