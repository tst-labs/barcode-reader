import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import BarCodeAppBar from "./BarCodeAppBar";
import BarcodeCardList from "./BarcodeCardList";
import BarcodeStartScanButton from "./BarcodeStartScanButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const openScanner = () => {
  console.log("Teste");
};

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BarCodeAppBar />
      <BarcodeCardList />
      <BarcodeStartScanButton openScanner={openScanner} />
    </div>
  );
};

export default App;
