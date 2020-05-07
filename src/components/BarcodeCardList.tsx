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

interface BarcodeCardListProps {
  codeScannerd: string;
  setCodeScanner: React.Dispatch<React.SetStateAction<string>>;
}
export default function BarcodeCardList(props: BarcodeCardListProps) {
  const clearCodeScaned = () => {
    props.setCodeScanner("");
  };
  return (
    <>
      {props.codeScannerd === "" ? (
        <Card elevation={2} style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="body1">
              Nenhum código foi lido ainda.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={2} style={{ marginTop: "20px" }}>
          <CardHeader title={"Codigo lido"} />
          <CardContent>
            <Typography variant="body1">{props.codeScannerd}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              color="secondary"
              aria-label="Deletar"
              onClick={clearCodeScaned}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </>
  );
}
