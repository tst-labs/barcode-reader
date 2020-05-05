import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

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
          Leitor de código de barra
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
