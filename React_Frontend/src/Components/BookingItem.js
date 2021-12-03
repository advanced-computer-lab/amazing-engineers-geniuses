import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Booking from './Booking';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Modal from '@mui/material/Modal';
const api = 'http://localhost:8000'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

 

const useStyles = makeStyles((theme) => ({

    title: {
        marginLeft: "39vw",
        marginTop : "3vw",
     //    marginBottom : "-2vw"
     },
     detailsModal : {
        overflow:'scroll',
        marginTop: "3vw",
        height:'100%',
        width:'100vw',
        display:'block',
        // marginRight :"15vw!important"
     },
     detailsTable : {
         width : "60vw!important"
        //  marginRight : "20vw!important"
         
     }
}));


const style = {
    TextAlign : 'center!important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function BookingItem(props){
    const [dep,setDep] = useState('');
    const [ret,setRet] = useState('');
    const [open, setOpen] = React.useState(false);
    const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnExists, setReturnExists] = useState(true);
    const booking = props.booking

    function createData(item, info) {
        return { item, info };
      }

      // one booking has 2 flights, from and to for each one
      //

      
    const rows = [
        createData('Number Of Passengers', booking.NumberOfPassengers),
        createData('Child Passengers', booking.KidPassengers),
        createData('Departure Cabin Class', booking.DepCabinClass),
        returnExists? createData('Return Cabin Class', booking.RetCabinClass) : () => {},
        createData('Departure Terminal', dep.Terminal),
        returnExists? createData('Return Terminal', ret.Terminal) : () => {},
        createData('Departure Airport', dep.FromAirport),
        returnExists? createData('Return Airport', dep.ToAirport) : () => {},
        createData('Departure Date', date),
        returnExists? createData('Return Date', returnDate) : () => {},
      ];
    
    
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    


    // const [canceledFlightFrom, canceledFlightFrom] = React.useState("");
    // const [canceledFlightTo, canceledFlightTo] = React.useState("");
    // const [canceledFlightCost, canceledFlightCost] = React.useState("");

    const classes = useStyles();

    
  const handleConfirmOpen = () => {
    setOpen(true);
}

const handleClose = () => setOpen(false);
const handleDetailsClose = () => setDetailsOpen(false);

const viewDetailsClicked = () => {  
    setDetailsOpen(true);
}

const cancelRequest = async (e, canceledNumber, canceledFrom, canceledTo, canceledCost) => {
    axios.post(`${api}/user/flight/cancelReservations`, {username : "test2", bookingNumber : canceledNumber})
    .then((res) => {
        console.log(canceledNumber, "canceleeeeddd");
        console.log(res.data);
        console.log("successs");
    }).catch((error) => {
        if(error){
            console.log(error);
        }
    })
    
    setOpen(false);
    
    await axios.post(`${api}/user/sendConfirmation`, {email: "davidedwarattia@gmail.com", emailSubject: "Reservation Canceled" , emailBody: "This is to inform you that you have canceled your flight from" + 
     canceledFrom + "to " + canceledTo + "an amount of " + canceledCost + "EGP has been added to your account"})
    .then((res) => {
        console.log("email sent")
        console.log(res.data)
    }).catch((error) =>{
        if(error){

            console.log(error);
        }
    })
    // window.location.reload();
 
}


    useEffect(()=>{
         axios.post(`${api}/user/flight/getDepartureAirport`, {departureId : props.booking.DepartureFlight})
        .then((res) =>{
            console.log(res.data.departureAirport,"departure");
            setList(props.booking);
            setDep(res.data.departureAirport);
            const curDate = res.data.departureAirport.DepDate.toString().substring(0,7);
            const curDay = res.data.departureAirport.DepDate.toString().substring(8,10);
            setDay(curDay);
            setDate(curDate);
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
        if(props.booking.ReturnFlight || props.booking.ReturnFlight != null){
            setReturnExists(true);
         axios.post(`${api}/user/flight/getDepartureAirport`, {departureId : props.booking.ReturnFlight})
        .then((res) =>{
            console.log(res.data.departureAirport,"departure");
            setRet(res.data.departureAirport);
            const curReturnDate = res.data.departureAirport.DepDate.toString().substring(0,10);
            setReturnDate(curReturnDate);
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    }
else{
    setReturnExists(false);
}},[])

    return(
        <div>
            {/* <div>{props.booking._id}</div> */}
                    <Box>
                    <Booking 
                        fromAirport = {dep.FromAirport}
                        toAirport = {dep.ToAirport}
                        day = {day}
                        date = {date}
                        price = {props.booking.TotalCost}
                        handleConfirmOpen = {handleConfirmOpen}
                        viewDetails = {viewDetailsClicked}
                    ></Booking>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >
            <Box sx={style}>
                <div className = {classes.modalDetails}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to cancel your booking?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Clicking yes will remove your booking 
                </Typography>
                </div>
                <div className = {classes.buttonGroup}>
                    <Button onClick = {(e) => {cancelRequest(e, props.booking._id, dep.FromAirport, dep.ToAirport,props.booking.TotalCost)}} className = {classes.confirmCancel}> YES </Button>
                    <Button onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
                </div>
            </Box>
            
            </Modal>
                    <Modal
                        open={detailsOpen}
                        onClose={handleDetailsClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className = {classes.detailsModal}
                >
            <Box sx={style}>
            <TableContainer className = {classes.detailsTable} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Attribute</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.item}>
              <StyledTableCell component="th" scope="row">
                {row.item}
              </StyledTableCell>
              <StyledTableCell align="left">{row.info}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
            
            </Modal>
      </Box>
        
{/* 
            <ul>
               <li> {dep.ToAirport} </li>
                <li> {dep.FromAirport} </li>
            </ul>
             */}
         
            <ul>
            </ul>
              <br/>
        </div>
    )
}

