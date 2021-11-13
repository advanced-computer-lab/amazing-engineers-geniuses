import React,{useState, useEffect} from 'react';

export default function Seats(props){
    const [chosenSeats,setChosen] = useState([]);

    const confirmSeats = () =>{
        //remove seats from available seats
        //update flight
    }

    const chooseSeat = (e,seat,available)=>{
        if(available){
            let index = chosenSeats.indexOf(seat);
            //if seat wasn't chosen before
            if(index == -1){
                e.target.style.backgroundColor = 'Orange'
                setChosen([...chosenSeats,seat]);
            }
            else{
                e.target.style.backgroundColor = ''
                let newSeats = chosenSeats.filter(s => s !== seat);
                setChosen(newSeats);
            }
        }
    }    

    const econSeats = props.Seats.Econ.map((seat,index)=>{
        let available = props.Seats.Available.indexOf(seat) > -1 ? true : false
        let color = available ? '' : 'Red';
        return (<button key={index} style={{backgroundColor: color}} onClick={(e)=>chooseSeat(e,seat,available)}>{seat}</button>)
    })

    const busSeats = props.Seats.Bus.map((seat,index)=>{
        let available = props.Seats.Available.indexOf(seat) > -1 ? true : false
        return (<button key={index} onClick={(e)=>chooseSeat(e,seat,available)}>{seat}</button>)
    })

    const firstSeats = props.Seats.First.map((seat,index)=>{
        let available = props.Seats.Available.indexOf(seat) > -1 ? true : false
        return (<button key={index} onClick={(e)=>chooseSeat(e,seat,available)}>{seat}</button>)
    })

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
            <button onClick={confirmSeats}>Confirm Seats</button>
        </div>
    )
}