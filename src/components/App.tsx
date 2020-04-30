import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import BarCodeAppBar from "./BarCodeAppBar";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BarCodeAppBar />
      <Card elevation={2} style={{ marginTop: "20px" }}>
        <CardContent>
          <Typography variant="body1">Nenhum código foi lido ainda.</Typography>
        </CardContent>
      </Card>
      <Card elevation={2} style={{ marginTop: "20px" }}>
        <CardHeader title="B000000" />
        <CardContent>
          <Typography variant="body1">B00000000</Typography>
        </CardContent>
        <CardActions>
          <IconButton color="secondary" aria-label="Deletar">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default App;
