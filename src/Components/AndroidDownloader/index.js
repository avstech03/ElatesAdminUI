import React from "react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import "./index.css";

const AndroidDownloader = (props) => {
  return (
    <div className="body-container">
      <Card
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="img"
          image="https://elates.s3.ap-south-1.amazonaws.com/73448ce6-3ba2-485f-9edf-77ecdc9e6fa1.png"
          sx={{ width: "50vh" }}
        />
        <div class="card-content-container">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: 30,
              color: "black",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Elates Smart Store
          </Typography>
          <div className="card-description-download-container">
            <Typography
              variant="p"
              flexWrap={true}
              href="/"
              sx={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Icon image Elates Grocer - Online Grocery order/Delivery App About
              this app ELATES is an on demand grocery delivery services.
            </Typography>
            <Button
              href="https://elates.s3.ap-south-1.amazonaws.com/elatesandroidapp.apk"
              variant="contained"
              sx={{ color: "white", width: 100 }}
            >
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AndroidDownloader;
