import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Button,
  Typography,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function BarCodeAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Barcode Reader
        </Typography>
        <Button color="inherit">
          <Typography variant="body1">Scan</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
