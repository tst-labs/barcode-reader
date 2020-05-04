import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import BarCodeAppBar from "./BarCodeAppBar";
import BarcodeCardList from "./BarcodeCardList";
import BarcodeScanner from "./BarcodeScanner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const App = () => {
  const classes = useStyles();
  const [codeScannerd, setCodeScanner] = useState("");
  return (
    <div className={classes.root}>
      <BarCodeAppBar />
      <BarcodeCardList codeScannerd={codeScannerd} />
      <BarcodeScanner setCodeScanner={setCodeScanner} />
    </div>
  );
};

export default App;
