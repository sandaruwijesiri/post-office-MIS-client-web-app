import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Image } from '@mui/icons-material';


import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';

import { useNavigate } from "react-router-dom";
import "./CSS/HomeScreenStyling.css";

import applogo from './applogo.png';
import backgroundImagePostOffice from './backgroundImagePostOffice.jpg';

// git push PostOfficeMIS-ClientWebApp

const drawerWidth = '18%';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function HomeScreen(){

  const handleOurServices = () => {
    document.getElementById('ourServicesId').scrollIntoView({behavior: 'smooth'});
  };

  const handleContactUs = () => {
    document.getElementById('contactUsId').scrollIntoView({behavior: 'smooth'});
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const styles = {
    backgroundStyle:{
      background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
       display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-10px'
       
    },
    bgimage: {
      /* Full height */
      height: '100%',
    
      /* Center and scale the image nicely */
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${backgroundImagePostOffice})`
    },
    img1: { backgroundImage: 'url("./applogo.png")' }
  }

  let navigate = useNavigate();
  return (
    <html style={{scrollBehavior: 'smooth'}}>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>
    <div>

    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} style={{
      background: '#952318'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="logo" src={applogo} style={{background: '#dddddd'}}/>
          <Typography variant="h6" noWrap component="div">
            &nbsp;&nbsp;&nbsp;&nbsp;Post Office MIS Client Web-App
          </Typography>
          
          <Button color="inherit" style={{position: 'absolute', right: '150px'}} onClick={handleOurServices}>Our Services</Button>
          <Button color="inherit" style={{position: 'absolute', right: '30px'}} onClick={handleContactUs}>Contact Us</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar/>
      <div style={{height:'100%', width:'100%' ,
      background: "linear-gradient(135deg, #fbfbd4, #f2c848)"}}>
        <DrawerHeader>
          <div  style={{float: 'left',
  width: '300px', height: '50px',
  padding: '10px'}}>
          <p style={{fontSize: '1.5em', fontWeight: 'bold', marginTop: '0px'}}>
          Select Option
          </p>
          </div>
          <IconButton onClick={handleDrawerClose} style={{background: '#d6c4a4'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/trackMyPackageScreen'); }}>
                <ListItemText primary='Track My Package' />
              </ListItemButton>
            </ListItem>
          <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/checkEstimatedDeliveryTimeScreen'); }}>
                <ListItemText primary='Check Estimated Delivery Time' />
              </ListItemButton>
            </ListItem>
          <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/sendMoneyOrdersScreen'); }}>
                <ListItemText primary='Send Money Orders' />
              </ListItemButton>
            </ListItem>
          <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/calculatePostalRatesScreen'); }}>
                <ListItemText primary='Calculate Postal Rates' />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/sendFeedbackScreen'); }}>
                <ListItemText primary='Send Feedback' />
              </ListItemButton>
            </ListItem>
        </List>
        
      </div>
      </Drawer>
      <Main open={open}>
      </Main>
    </Box>
    
    <div>
      <img src={backgroundImagePostOffice} alt="background" style={{height: '100vh', width: '100vw', filter: `brightness(40%)`}}></img>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%)`, zIndex: 2, textAlign: 'center'}}>
        <p style={{color: 'white', fontSize: '3em', fontWeight: 'bold'}}>
          Welcome!
        </p>
        <p style={{color: 'white', fontSize: '2em'}}>
          Welcome to the post office client web-app. Here you can take care of most of your postal needs within minutes. Click the icon at the top left to begin!
        </p>
      </div>
      <div style={{position: 'absolute', right: '16px', bottom: '8px'}}>
          <p style={{color: 'white', fontSize: '0.8em'}}>
            Image by <a href="//commons.wikimedia.org/wiki/User:Dan_arndt" title="User:Dan arndt" style={{color: 'white'}}>Dan arndt</a> - &nbsp;
            <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" 
            title="Creative Commons Attribution-Share Alike 4.0" style={{color: 'white'}}>CC BY-SA 4.0</a>,&nbsp;
            <a href="https://commons.wikimedia.org/w/index.php?curid=50479073" style={{color: 'white'}}>Link</a>
          </p>
        </div>
    </div>
    <div className="HomeScreen" style={{minHeight: '100vh'}}>
      <div id='ourServicesId' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '-10%', paddingTop: '10%',
       height: '100vh', width: '100vw', background: 'linear-gradient(135deg, #fbfbd4, #f2c848)'}}>
        <div style={{background: '#d6c4a4', padding: '30px', margin: '10px'}}>
        <p style={{color: 'black', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center'}}>
          Track Packages
          </p>
          <p style={{textAlign: 'center'}}>
            You can easily track your packages and their 
            <br></br> live location with our web-app. 
            <br></br> Convenience at your fingertips.
          </p>
        </div>
        <div style={{background: '#d6c4a4', padding: '30px', margin: '10px'}}>
        <p style={{color: 'black', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center'}}>
          Send Money Orders
          </p>
          <p style={{textAlign: 'center'}}>
            You can send money orders through our web-app
            <br></br> without even going to the post office. 
            <br></br> You just need your credit card.
          </p>
        </div>
        <div style={{background: '#d6c4a4', padding: '30px', margin: '10px'}}>
        <p style={{color: 'black', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center'}}>
          Postal Rates
          </p>
          <p style={{textAlign: 'center'}}>
            Calculate the postal rates 
            <br></br> for your parcel easily with our web-app.
            <br></br> Just enter the details and voila!
          </p>
        </div>
      </div>
      <div style={{height: '40vh', background: '#3f3430', paddingTop: '2%',  display: 'flex', flexDirection: 'row'}}>
        <div id='contactUsId' style={{ marginLeft: '10%'}}>
          <p style={{color: 'white', fontSize: '1.5em', fontWeight: 'bold', marginTop: '-1px'}}>
            Contact us:
          </p>
          <p style={{color: 'white', fontSize: '1em', marginTop: '-1px'}}>
            Email: <a href = "mailto: sandarumihiran29@gmail.com" style={{color: 'white'}}>sandarumihiran29@gmail.com</a>
            <br></br>
            <br></br>
            Phone: <a href = "tel:+94753140906" style={{color: 'white'}}>0753140906</a>
            <br></br>
            <br></br>
            Address: Post Master General, Postal Head Quarters, D.R Wijewardena Mawatha, Colombo 10, 001000, Sri Lanka.
          </p>
        </div>
      </div>
    </div>
    </div>
    </html>
  );
}

// By &lt;a href=&quot;//commons.wikimedia.org/wiki/User:Dan_arndt&quot; title=&quot;User:Dan arndt&quot;&gt;Dan arndt&lt;/a&gt; - &lt;span class=&quot;int-own-work&quot; lang=&quot;en&quot;&gt;Own work&lt;/span&gt;, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=50479073">Link</a>