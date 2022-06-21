// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import axios from "axios";

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

function SlackMessenger() {
  const [slackmessenger, setMessenger] = useState([]);

  useEffect(async () => {
    axios.get("http://192.168.0.23:9990/slack-thread").then((res) => {
      const threads = res.data;
      console.log(threads.payloadtext);
      setMessenger(threads);
    });
  }, []);
  const alertContent = (threads) => (
    <Typography align="left" variant="body2" color="white">
      {threads.payloadtext}
    </Typography>
  );

  const replyBox = (threads) => (
    <TextField
      label="Reply Message"
      variant="standard"
      fullWidth
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          axios.post("http://192.168.0.23:9990/slack-reply", {
            payloadts: threads.payloadts,
            payloadtext: ev.target.value,
          });
          change = document.querySelector(TextField);
          change.TextField.label = "Message Sent!"
        }
      }}
    />
  );

  return (
    <DashboardLayout>
      <Box mt={2} mb={1}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Box p={2}>
                <Typography variant="h5">Slack Threads: #su-sre</Typography>
              </Box>
              {slackmessenger.map((object) => (
                <Box key={object}>
                  <Alert color="info" dismissible="false">
                    {alertContent(object)}
                    {replyBox(object)}
                  </Alert>
                  <Divider>-</Divider>
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default SlackMessenger;
