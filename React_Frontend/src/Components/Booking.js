import React, {useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { makeStyles } from "@mui/styles";
import Modal from '@mui/material/Modal';
const api = 'http://localhost:8000';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const useStyles = makeStyles((theme) => ({
    
    root: {
        background : "#d3d3d3!important",
        width : "40vw",
        height : "25vw",
        marginLeft : "28vw",
        marginTop : "4vw!important",
        borderRadius : "2vw!important",
        boxShadow : "5vw"
    },
    main : {
        TextAlign : "none!important"
    },
    fromRoot:{
        marginLeft : "5vw",
        marginTop : "2vw",
    },
    toRoot: {
        marginLeft : "27vw",
        marginTop : "-6.8vw"
    },
    dateRoot : {
        marginTop : "3vw",
        marginLeft : "5vw"
    },
    priceRoot : {
        width : "20vw!important",
        marginLeft : "24vw",
        marginTop : "-4.5vw!important",
        background : "#00008b",
        color: "white",
        paddingRight : "4vw",
        paddingLeft : "3vw",
        borderRadius : "4vw"
    },

    cancelButton :{
        marginLeft : "13vw!important",
        background : "red!important",
        color: "white!important",
        marginTop : "3vw!important"
    },
    viewDetailsButton :{
        marginLeft : "10vw",
        background : "#00008b!important",
        color: "white!important",
        marginLeft : "3vw!important",
        marginTop : "3vw!important"
    },
    arrowIcon:{ 
        color : "#00008b",
        marginLeft : "16vw",
        marginTop : "-7vw",
        height : "5vw!important",
        width : "5vw!important" 
    },
    buttonGroup : {
        marginLeft : "5.5vw",
        marginTop : "3vw"
    },
    confirmCancel : {
        background : "red!important",
        color : "white!important",
        marginRight : "4vw!important"
    },
    noCancel : {
        background : "#00008b!important",
        color : "white!important"
    },
    modalDetails : {
        
    }

}))



export default function Booking (props) {

  

// once canceled is clicked, get the flightnumber of that one and send it down to this 

  const classes = useStyles();
  return (
    <Box sx={{ minWidth: 275 }}>
        
        <Card className = {classes.root} variant="outlined">
            <React.Fragment>
            <CardContent className = {classes.from}>
                <div className = {classes.fromRoot}>
                    <div className = {classes.fromDiv}> From </div>
                    <h2> {props.fromAirport}</h2>
                </div>
                <DoubleArrowIcon className = {classes.arrowIcon}/>
                <div className = {classes.toRoot}>
                    <div  className = {classes.toDiv}> To </div>
                    <h2> {props.toAirport} </h2>
                </div>
                <div className = {classes.dateRoot}>
                    <h3>{props.day}</h3>
                    <div>{props.date} </div>
                </div>
                <div className = {classes.priceRoot}>
                    <h7>EGP</h7>
                    <h3>{props.price}</h3>
                </div>
            </CardContent>         
            <CardActions>
                <div  style={{display : "flex"}}>
                    <Button onClick={props.handleConfirmOpen} className = {classes.cancelButton} size="small">Cancel</Button>
                    <Button onClick = {props.viewDetails} className = {classes.viewDetailsButton} size="small">Details</Button>
                </div>
            </CardActions>
            </React.Fragment>
        </Card>
        
    </Box>
  );
}


