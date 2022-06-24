import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import axios from "axios";

import { useEffect, useState } from "react";

function SlackMessenger() {
  const [slackmessenger, setMessenger] = useState([]);

  useEffect(async () => {
    axios.get("http://192.168.0.23:9990/slack-thread").then((res) => {
      const threads = res.data;
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
      fullWidth
      // onClick={(e) => {
      //   const myId = e.target.id;
      //   const label = "-label";
      //   console.log(threads.replied);
      //   if (threads.replied === "true") {
      //     const changeInputLabel = document.getElementById(myId + label);
      //     changeInputLabel.textContent = "Message Replied!";
      //     e.textContent = "";
      //   }
      // }}
      label="Reply Message"
      variant="standard"
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          axios.post("http://192.168.0.23:9990/slack-reply", {
            id: threads.id,
            payloadts: threads.payloadts,
            payloadtext: ev.target.value,
          });
          console.log(threads.id);
          const myId = ev.target.id;
          const label = "-label";
          const changeInputLabel = document.getElementById(myId + label);
          changeInputLabel.textContent = "Message Replied!";
          changeInputLabel.style.color = "green";
          changeInputLabel.label = "";
        }
      }}
    />
  );

  return (
    <DashboardLayout>
      <Box mt={2} mb={1}>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Box p={2}>
                <Typography variant="h5">Slack Threads: #su-sre</Typography>
              </Box>
              {slackmessenger.map((object) => (
                <Box
                  p={1}
                  mt={2}
                  backgroundColor={object.replied === true ? "honeydew" : "aliceblue"}
                >
                  {alertContent(object)}
                  {replyBox(object)}
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
