import React,{useState, useEffect} from 'react';

export default function Seats(props){
    const [chosenSeats,setChosen] = useState([]);



    const chooseEconSeat = (e,seat)=>{
        let index = chosenSeats.indexOf(seat);
        //if seat wasn't chosen before
        if(index == -1){
            setChosen([...chosenSeats,seat]);
        }
        else{
            setChosen(chosenSeats.splice(index,1))
        }

    }    
    const econSeats = props.Seats.Econ.map((seat,index)=>(
        <button key={index} onClick={(e)=>chooseEconSeat(e,seat)}>{seat}</button>
        )
    )

    const busSeats = props.Seats.Bus.map((seat,index)=>(
        <button key={index} onClick={()=>{}}>{seat}</button>
        )
    )

    const firstSeats = props.Seats.First.map((seat,index)=>(
        <button key={index} onClick={()=>{}}>{seat}</button>
        )
    )

    return(
        <div>
            <div>
                <h2>Econ Seats</h2>
                {econSeats}
            </div>
            <div>
                <h2>Bus Seats</h2>
                {busSeats}
            </div>
            <div>
                <h2>First Seats</h2>
                {firstSeats}
            </div>
        </div>
    )
}