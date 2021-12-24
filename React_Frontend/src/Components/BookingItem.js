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
import NewBooking from './NewBooking';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Modal from '@mui/material/Modal';
import Auth from '../services/Auth';
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
     Modaldetails : {
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
         
     },
     confirmCancel: {
         background: "red",
         marginLeft : "10vw"
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
    const [departureOpen, setDepartureOpen] = React.useState(false);
    const [returnOpen, setReturnOpen] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [depDate, setDepDate] = useState('');
    const [returnExists, setReturnExists] = useState(true);
    const curUser = Auth.getCurrentUser();
    const booking = props.booking;
    const [arrDep, setArrDep] = useState('');
    const [arrRet, setArrRet] = useState('');
    
    
    const[depFlightDepTime,setDepFDepT]= useState('');
    const[depFlightArrTime,setDepFArrT]= useState('');
    
    const[retFlightDepTime,setRetFDepT]= useState('');
    const[retFlightArrTime,setRetFArrT]= useState('');

    const[departureCost,setDepartureCost]= useState(0);
    const[returnCost, setReturnCost]= useState(0);
  
    function createData(item, info) {
        return { item, info };
      }

      // one booking has 2 flights, from and to for each one
      //
      
    // const rows = [
    //     createData('Number Of Passengers', booking.NumberOfPassengers),
    //     createData('Child Passengers', booking.KidPassengers),
    //     createData('Departure Cabin Class', booking.DepCabinClass),
    //     returnExists? createData('Return Cabin Class', booking.RetCabinClass) : () => {},
    //     createData('Departure Terminal', dep.Terminal),
    //     returnExists? createData('Return Terminal', ret.Terminal) : () => {},
    //     createData('Departure Airport', dep.FromAirport),
    //     returnExists? createData('Return Airport', dep.ToAirport) : () => {},
    //     createData('Departure Date', date),
    //     returnExists? createData('Return Date', returnDate) : () => {},
    //   ];
    
    
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    

    const classes = useStyles();

    
  const handleConfirmOpen = () => {
    setOpen(true);
}
  const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => setOpen(false);
const handleDetailsClose = () => setDetailsOpen(false);
const handleReturnClose = () => setReturnOpen(false);
const handleDepartureClose = () => setDepartureOpen(false);
// const handleDetailsClose = () => setDetailsOpen(false);

const viewDetailsClicked = () => {  
    // setDetailsOpen(true);
}
const cancelReturnClicked = () => {  
    setReturnOpen(true);
}
const cancelDepartureClicked = () => {  
    setDepartureOpen(true);
}

const cancelDepRequest = async (e, canceledBookingNumber) =>{
  axios.post(`${api}/user/flight/cancelSingleFlight`, {username : curUser.username, bookingNumber : canceledBookingNumber, canceledFlightId: dep._id, DepSeats: booking.DepSeats, DepList: dep.SeatsList, canceledType : "departing"})
    .then((res) => {
        console.log(canceledBookingNumber, "canceleeeeddd");
        // console.log(res.data);
        console.log("successs");
    }).catch((error) => {
        if(error){
            console.log(error);
        }
    })
}
const cancelRetRequest = async (e, canceledBookingNumber) =>{
  axios.post(`${api}/user/flight/cancelSingleFlight`, {username : curUser.username, bookingNumber : canceledBookingNumber, canceledFlightId: ret._id, RetSeats: booking.RetSeats, RetList: ret.SeatsList, canceledType : "departing"})
    .then((res) => {
        console.log(canceledBookingNumber, "canceleeeeddd");
        // console.log(res.data);
        console.log("successs");
    }).catch((error) => {
        if(error){
            console.log(error);
        }
    })
}

function getClass2(CabinClass){
    if(CabinClass ==='E'){
        return 'Econ';
    }
    else if(CabinClass === 'F'){
        return 'First';
    }
    else if (CabinClass === 'B'){
        return 'Bus';
    }
    return 'Error in getClass()';
}


const cancelRequest = async (e, canceledNumber, canceledFrom, canceledTo, canceledCost) => {
    axios.post(`${api}/user/flight/cancelReservations`, {username : curUser.username, bookingNumber : canceledNumber, DepId: dep._id, RetId: ret._id, DepSeats: booking.DepSeats, RetSeats: booking.RetSeats, DepList: dep.SeatsList, RetList: ret.SeatsList})
    .then((res) => {
        console.log(canceledNumber, "canceleeeeddd");
        // console.log(res.data);
        console.log("successs");
    }).catch((error) => {
        if(error){
            console.log(error);
        }
    })

    // axios.post(`${api}/user/flight/addSeatsCancelled`,{Booking: props.booking})
    // .then((res)=>{
    //   console.log(res.data);
    // }).catch((err)=>{
    //   console.log(err)
    // })
    
    setOpen(false);
    window.location.reload();
    
    await axios.post(`${api}/user/sendConfirmation`, {email: curUser.Email, emailSubject: "Reservation Canceled" , emailBody: "This is to inform you that you have canceled your flight from " + 
     canceledFrom + " to " + canceledTo + " an amount of " + canceledCost + " EGP has been added to your account"})
    .then((res) => {
        console.log("email sent")
        console.log(res.data)
    }).catch((error) =>{
        if(error){

            console.log(error);
        }
    })
}


    useEffect(()=>{
         axios.post(`${api}/user/flight/getDepartureAirport`, {departureId : props.booking.DepartureFlight})
        .then((res) =>{
            console.log(res.data.departureAirport,"departure");
            setList(props.booking);
            setDep(res.data.departureAirport);
            const curDate = res.data.departureAirport.DepDate.toString().substring(0,7);
            const curDay = res.data.departureAirport.DepDate.toString().substring(8,10);
            const cabin = getClass2(props.booking.DepCabinClass);
            setDepartureCost(res.data.departureAirport.Price[cabin]);
            const x = res.data.departureAirport.DepDate.toString().substring(0,10); //dep date
            setDepDate(x);
            console.log(depDate,"yeeeeehhaaaa")
            const y=res.data.departureAirport.ArrDate.toString().substring(0,10); //arr date
            
            const depFlightDepTime=res.data.departureAirport.Departure.Hours + ":" + res.data.departureAirport.Departure.Minutes + " " + res.data.departureAirport.Departure.Period;
            const depFlightArrTime=res.data.departureAirport.Arrival.Hours + ":" + res.data.departureAirport.Arrival.Minutes + " " + res.data.departureAirport.Arrival.Period;

            setDay(curDay);
            setDate(x);
            
            setArrDep(y);
            
            setDepFDepT(depFlightDepTime);
            setDepFArrT(depFlightArrTime);
            
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
        if(props.booking.ReturnFlight || props.booking.ReturnFlight != null){
            setReturnExists(true);
         axios.post(`${api}/user/flight/getDepartureAirport`, {departureId : props.booking.ReturnFlight})
        .then((res) =>{
            //console.log(res.data.departureAirport,"departure");
            setRet(res.data.departureAirport);
            const curReturnDate = res.data.departureAirport.DepDate.toString().substring(0,10);
            setReturnDate(curReturnDate);

            const cabin = getClass2(props.booking.RetCabinClass);
            setReturnCost(res.data.departureAirport.Price[cabin]);

            const z = res.data.departureAirport.ArrDate.toString().substring(0,10);
            setArrRet(z);
            
            const retFlightDepTime=res.data.departureAirport.Departure.Hours + ":" + res.data.departureAirport.Departure.Minutes + " " + res.data.departureAirport.Departure.Period;
            const retFlightArrTime=res.data.departureAirport.Arrival.Hours + ":" + res.data.departureAirport.Arrival.Minutes + " " + res.data.departureAirport.Arrival.Period;
            
            setRetFDepT(retFlightDepTime);
            setRetFArrT(retFlightArrTime);
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
        <div> 
            {/* <div>{props.booking._id}</div> */}
                    <Box>
                    <NewBooking 
                        departureFromAirport = {dep.FromAirport}
                        departureToAirport = {dep.ToAirport}
                        returnFromAirport = {ret.FromAirport}
                        returnToAirport = {ret.ToAirport}
                        day = {day}
                        departureDate = {depDate}
                        returnDate = {returnDate}
                        returnExists = {returnExists}
                        departureCost = {departureCost}
                        returnCost = {returnCost}
                        price = {props.booking.TotalCost}
                        handleConfirmOpen = {handleConfirmOpen}
                        // viewDetails = {viewDetailsClicked}
                        cancelDepartureClicked = {cancelDepartureClicked}
                        cancelReturnClicked = {cancelReturnClicked}
                        booking = {booking}
                        returnDate={returnDate}
                        arrDep={arrDep}
                        arrRet={arrRet}
                        depFlightDepTime={depFlightDepTime}
                        depFlightArrTime={depFlightArrTime}
                        retFlightDepTime={retFlightDepTime}
                        retFlightArrTime={retFlightArrTime}
                        depCabin = {getClass2(props.booking.DepCabinClass)}
                        retCabin = {getClass2(props.booking.RetCabinClass)}
                    ></NewBooking>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >

            <Box sx={style}>
                <div className = {classes.confirmationModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to cancel your booking?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Clicking yes will remove your booking 
                </Typography>
                </div>
                <div style = {{textAlign: "center"}} className = {classes.buttonGroup}>
                    <Button style = {{marginTop: "2vw" ,marginRight: "6vw",color: "white", background: "red"}} onClick = {(e) => {cancelRequest(e, props.booking._id, dep.FromAirport, dep.ToAirport ,props.booking.TotalCost)}} className = {classes.confirmCancel}> YES </Button>
                    <Button style = {{marginTop: "2vw", marginLeft: "1vw", color: "white", background: "#002677"}} onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
                </div>
            </Box>
            
            </Modal>
                    <Modal
                        open={returnOpen}
                        onClose={handleReturnClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >

            <Box sx={style}>
                <div className = {classes.modalDetails}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to cancel your return Flight?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Clicking yes will cancel your flight
                </Typography>
                </div>
                <div className = {classes.buttonGroup}>
                    <Button onClick = {(e) => {cancelRetRequest(e, props.booking._id, ret.FromAirport, ret.ToAirport ,props.booking.TotalCost)}} className = {classes.confirmCancel}> YES </Button>
                    <Button onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
                </div>
            </Box>
            
            </Modal>
                    <Modal
                        open={departureOpen}
                        onClose={handleDepartureClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >

            <Box sx={style}>
                <div className = {classes.modalDetails}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to cancel your depart flight?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Clicking yes will cancel your depart flight 
                </Typography>
                </div>
                <div className = {classes.buttonGroup}>
                    <Button style = {{background:"red"}} onClick = {(e) => {cancelDepRequest(e, props.booking._id, dep.FromAirport, dep.ToAirport ,props.booking.TotalCost)}} className = {classes.confirmCancel}> YES </Button>
                    <Button style = {{background: "blue"}}onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
                </div>
            </Box>
            
            </Modal>
                    <Modal
                        open={returnOpen}
                        onClose={handleDetailsClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className = {classes.detailsModal}
                >
            {/* <Box sx={style}>
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
            </Box> */}
            
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
        </div>
    )
}
