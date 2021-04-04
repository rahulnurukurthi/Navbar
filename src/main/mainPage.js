import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Route, Switch, BrowserRouter,Link } from "react-router-dom";
import HomePage from "./subPages/homePage";
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  leftPanelStyles: {
    width: "100%",
    maxWidth: 260,
    color: "#FFF",
    backgroundColor: "#1a1a1a",
  },
  gridStyles: {
    height: window.innerHeight - 0,
    overflow: "auto",
    backgroundColor:"#e9ecef"
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [listItems, setListItems] = useState([]);

  //   Setting the menu list data on render
  useEffect(() => {
    let items = [
      {
        id: 0, parentList: "Navigation",sublistExpansionStatus:true,
        subList: [
          { subId: 1, childList: "Homepage", link: "/homePage",icon:<HomeIcon /> },
          { subId: 2, childList: "Dashboard", link: "/dashBoard",icon:<DashboardIcon /> },
        ],
      },
      {
        id: 1, parentList: "Another Menu",sublistExpansionStatus:true,
        subList: [
          { subId: 1, childList: "Friends", link: "/friends",icon:<PeopleIcon /> },
          { subId: 2, childList: "Settings", link: "/settings",icon:<SettingsIcon /> },
          { subId: 3, childList: "Information", link: "/information",icon:<InfoIcon /> },
        ],
      },
    ];
    setListItems(items);
  }, []);

  // Toggle hide and show list items
  const handleClickList = (index) => {
    let itemList=[...listItems];
    itemList[index].sublistExpansionStatus=!itemList[index].sublistExpansionStatus
    setListItems(itemList);
  };

  // Function to dynamically loop through array list and render the side bar data
  const renderMenuList = () => {
    let displayList = [];
    let listData = listItems;
    listData.map((data) => {
      displayList.push(
        <List component="nav" className={classes.leftPanelStyles} key={data.id}>
          <ListItem button onClick={()=>handleClickList(data.id)}>
            <ListItemText primary={data.parentList} />
            {data.sublistExpansionStatus ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={data.sublistExpansionStatus} timeout="auto" unmountOnExit>
            {data.subList.map((subData) => (
              <List component="div" key={subData.subId} disablePadding>
                <Link
                  style={{ textDecoration: "none", color: "#FFF" }}
                  to={subData.link}
                >
                  <ListItem button>
                  <ListItemIcon style={{color:'#FFF'}}>
                    {subData.icon}
                  </ListItemIcon>
                    <ListItemText primary={subData.childList} />
                  </ListItem>
                </Link>
              </List>
            ))}
          </Collapse>
        </List>
      );
    });
    return displayList;
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Grid container spaccing={3} className={classes.gridStyles}>
          <Grid item xs={6} sm={4} md={2} lg={2} xl={2} style={{ backgroundColor: "#1a1a1a" }}>
            <Box
              p={2}
              style={{
                color: "#FFF",
                fontSize: "20px",
                backgroundColor: "#2574A9",
              }}
            >
              Project Name
            </Box>
            {renderMenuList()}
          </Grid>
          <Grid item xs={6} sm={8} md={10} lg={10} xl={10}>
            <Switch>
              <Route path="/homePage">
                <HomePage pageName="Homepage" />
              </Route>
              <Route path="/dashBoard">
                <HomePage pageName="Dashboard" />
              </Route>
              <Route path="/friends">
                <HomePage pageName="Friends" />
              </Route>
              <Route path="/settings">
                <HomePage pageName="Settings" />
              </Route>
              <Route path="/information">
                <HomePage pageName="Information" />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
}