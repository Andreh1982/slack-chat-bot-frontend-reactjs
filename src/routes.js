import SlackMessenger from "layouts/slackmessenger";
import ShowPayload from "layouts/showpayload";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Slack Messages",
    key: "slackmessenger",
    icon: <Icon fontSize="small">messages</Icon>,
    route: "/slackmessenger",
    component: <SlackMessenger />,
  },
  {
    type: "collapse",
    name: "API Messages Payload",
    key: "showpayload",
    icon: <Icon fontSize="small">code</Icon>,
    route: "/showpayload",
    component: <ShowPayload />,
  },
];

export default routes;
