import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BarcodeStartScanButton from "./BarcodeStartScanButton";
import Scanner from "./Scanner";

const defaultConfig = {
  frequency: 5,
  numOfWorkers: 2,
  locate: true,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      width: 800,
      height: 600,
      deviceId: 0,
      facingMode: "environment",
    },
    area: {
      top: "0%",
      right: "0%",
      left: "0%",
      bottom: "0%",
    },
  },
  decoder: {
    readers: ["ean_reader", "code_39_reader", "code_128_reader"],
  },
  locator: {
    halfSample: true,
    patchSize: "medium",
  },
};

interface BarcodeScannerProps {
  setCodeScanner: React.Dispatch<React.SetStateAction<string>>;
}

const BarcodeScanner = (props: BarcodeScannerProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const closeCamera = () => {
    setOpen(false);
  };
  const openScanner = () => {
    setOpen(true);
  };

  const handleScanResult = (result: any) => {
    props.setCodeScanner(result);
  };
  const stopScan = () => {
    console.log("Stop Scan...");
  };

  return (
    <>
      <Dialog open={open} onClose={closeCamera} fullScreen={fullScreen}>
        <DialogTitle id="barcode-camera-dialog">{"Camera"}</DialogTitle>
        <DialogContent>
          <DialogContent>
            <Scanner
              config={defaultConfig}
              onDetected={handleScanResult}
              onCancel={stopScan}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={closeCamera}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <BarcodeStartScanButton openScanner={openScanner} />
    </>
  );
};

export default BarcodeScanner;
