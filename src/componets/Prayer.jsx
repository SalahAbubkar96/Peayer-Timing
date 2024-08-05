import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export default function Prayer({ name, Timing ,image}) {
  return (
    <Card sx={{ maxWidth: 200, maxHeight: 280, minWidth: 150 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="h3" color="text.secondary"   style={{width:"5px"}} >
          {Timing}
        </Typography>
      </CardContent>
    </Card>
  );
}
