// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import Box from "@mui/material/Box";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import axios from "axios";

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

function ShowPayload() {
  const [payload, setPayload] = useState([]);

  useEffect(async () => {
    axios.get("http://192.168.0.23:9990/slack-thread").then((res) => {
      const threads = res;
      setPayload(threads);
    });
  }, []);

  const getPayloadData = (res) => (
    <Typography align="left" variant="caption" paragraph component="div">
      <h>.</h>
      <pre>{JSON.stringify(res.data, null, 2)}</pre>
    </Typography>
  );

  return (
    <DashboardLayout>
      <Box mt={2} mb={1}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Box p={2}>
                <Typography variant="h5">API Messages Payload</Typography>
                <Divider>-</Divider>
                <Alert color="success" dismissible="false">
                  {getPayloadData(payload)}
                </Alert>
              </Box>
              <Box>
                <Divider>-</Divider>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default ShowPayload;
