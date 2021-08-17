import { AppBar, Avatar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import KitchenIcon from "@material-ui/icons/Kitchen";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useEffect, useState } from "react";
import About from "./About";
import "./App.css";
import Home from "./Home";
import LogIn from "./LogIn";
import MyFridge from "./MyFridge";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

const customer_id = process.env.REACT_APP_TEST_USER || window.userId;
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

const theme = createTheme({
  palette: {
    primary: {
      main: "#FAC4C4",
    },
    secondary: {
      main: "#22783E",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(0);
  const [customer, setCustomer] = useState();
  

  useEffect(() => {
    if (!customer_id) {
      return;
    }
    async function getData() {
      const customerResponse = await axios.get(
        `${api}/customer/${customer_id}`
      );
      setCustomer(customerResponse.data);
    }

    getData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App container">
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Home" icon={<HomeIcon />} />
            <Tab label="My Fridge" icon={<KitchenIcon />} />
            <Tab label="About" icon={<ContactSupportIcon />} />
            <Tab label="Log In" icon={<ExitToAppIcon />} />
          </Tabs>
            {customer && (
              <Avatar className="avatar" alt={customer.user_name} src={customer.picture} />
            )}
        </AppBar>
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyFridge />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <About />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LogIn />
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}

export default App;
