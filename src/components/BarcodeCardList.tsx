import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function BarcodeCardList() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
