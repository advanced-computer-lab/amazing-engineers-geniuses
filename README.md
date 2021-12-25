# Amazing-Engineers-Geniuses
This is a website for our AirLine "Amazing Air" whose main goal is to give our customers a unique travel experience. We aim to help our customers easily navigate through our website and explore what our airline has to offer from searching for flights, booking flights, checking their bookings, and editing booked flights. In addition, it helps our staff "admin(s)" to edit, delete,create flights in order to sustain the demand. 

Our customers can pay online using their credit card and an invoice will be sent to them via email to confirm their booking. Due to the pandemic, booking a flight right now is a dream come true to many, and we want to make this experience as simple and as satisfying as possible.  

### Motivation
Web Development is a crucial part in anything in our era. Thus, this course created the perfect opportunity for us to explore node JS, React, CSS and JavaScript all in one. It also pushed us to challenge ourselves. 
We had a bad experience booking online last year so we tried to make ours as easy to use as possible. Our goal is to provide the user with the ultimate online experience. 

### Build Status
build status: success 

### Code Style
We used the standard Javascript Coding style to improve readability and maintainability of our code.
Moreover, this gives a uniform appearance to the code and makes it as clean and easy to read as possible.
A semicolon is present after each statement.
All functions are declared above the code that uses them.
We also used a naming conventions for local variables. We named the local variables using camel case lettering starting with small letter.

### Screenshots
As the saying goes, a picture is equal to a thousand words. Most people will be interested if there is a visual representation of what the project is about. It helps them understand better. A visual representation can be snapshots of the project or a video of the functioning of the project.

### Tech/Framework used
- MongoDB
- Mongoose
- Express
- ReactJS
- NodeJS
- Stripe
- Nodemailer
- Bootstrap
- Material UI


### Features
Our main aim was to make our website simple and easy to navigate through. 
We added a progress bar to inform the user of how far along he is in the booking process.
We also added feedback to show when a page is loading.
In addition, if a user does a wrong action in the booking process(such as selecting more seats than the number of passengers he initially chose) an instant alert message is shown and such action is not allowed.

### Code Examples
This is where you try to compress your project and make the reader understand what it does as simply as possible. This should help the reader understand if your code solves their issue.

### Installation
node 
npm 
font awesome
bootstrap 

### API reference
post -/availableFlights 
get -/flight/show/:id
post -/flight/viewReservations
post -/flight/cancelReservations
post -/flight/getArrivalAirport
get -/flight/getArrivalAirport
post -/flight/getDepartureAirport
get -/flight/getDepartureAirport
post-/sendConfirmation
post-/searchFlights
post-/createBooking
post-/findReturnFlights
post-/flight/addSeatsCancelled
put-/booking/editSeats
get -/find/
get-/find/:id
put-/update/:id
get-/flight/show/:id
put-/booking/edit


### How to Use?
We have 3 different types of users-each of which has different authorization.
As a Guest:

    1- You can search for flights using the search in the homepage.
        a- you can choose the departure airport "from" , arrival airport "to" from the list
        b- select the date the you want to travel on by spcifiying it on "Departure" and same thing for "return" as the date you want to return on.
        c- select both cabin classes in booth flights.
        d- spcify the number of adult(s) and childern that will be traveling with you.

        finally , click search in order to find the flight(s) that meets your requiremnts.
        you can then see the datails of any flight by clicking on the accordion.

    2- You can nagivate through the website by clicking on "Plan" in the navbar and see all the flights that are available in "flight schedule"
     a- in flight schedule , You can see the flights details by clicking on the accordion 

    3- You can register to be a permenant user with your own account by clicking on "My Account" in the navbar.

    4- You can't book flights as a guest user , you have to be logged in first.

As an Admin:

    1- To have the admin credentials , you log in first as an Admin by clicking on "My Account".

    2- You can create new flights by clicking "Hello Admin" --> "Manage Flights" in the navbar.

    3- You can Update/Delete a pre-existant flight by clicking "Hello Admin" --> "Manage Flights" in the navbar.

    4- You can also Search for flights.

    5- You can see your profile that has your personal info by clicking on "Hello Admin" --> "My profile" in Navbar.Moreover,you can always edit this info by clicking on "edit" button 

As a Logged-in User:

    1- You can see your profile that has your personal info by clicking on "Hello User" --> "My profile" in Navbar.Moreover,you can always edit this info by clicking on "edit" button.

    2- You can search for flights using the search in the homepage.
        a- you can choose the departure airport "from" , arrival airport "to" from the list
        b- select the date the you want to travel on by spcifiying it on "Departure" and same thing for "return" as the date you want to return on.
        c- select both cabin classes in booth flights.
        d- spcify the number of adult(s) and childern that will be traveling with you.

        finally , click search in order to find the flight(s) that meets your requiremnts.
        you can then see the datails of any flight by clicking on the accordion.

    3- as you go long in the booking process, you can see the steps you made and flights you chose on the side in the boooking summary.

    4- You can pay with credit card by entering the credit card info. An email will be sent to you for confirmation.

    5- You can always view/edit/delete your previous booking(s).
     a- edit: you can reselect the seats choosen , change the flight itself or change the cabin class 
             this can be done in either return/departure flight.
             this bookking is then updated and shows the new details with the price diffrence when you click on the flight accordion. 

     b- delete: by clicking on "cancel" button in the booked flight.

    c- view: by clicking on "details" to view the itinerary of this booking.

### Tests

1- a guest user cant book a flight.

2- user cant book a flight untill all seats are choosen.

3- number od seats to b e booked bya user must be less than or equal number of availabe seats.

4-when deleting a booking , its removed from the user bookings.

5- when editing a flight, the pre-exsiting data is already filled in and ready to be changed.

6- price diffrence will be with negative if the price is higher than the paid amount and postitive if less than the paid amound indicating the user will regain some of his money back.

7- reverable buttons only appear when an action can be reversed.

8-

### Contribute
Any contributions to our code is welcomed. You can always improve the frontend for a better UX.

### Credits
Our team -"Amazing-Engineers-Geniuses" did tremendous work in order to fullfill this project.
Special thanks to our Scrum Master - Khaled Romeh for being always there for support and for managing our team smoothly.
Shahd Medhat , Amira Hossam , Mohannad Osama , David Edwar also have all worked really hard to perfect this website.
https://www.freecodecamp.org/learn/back-end-development-and-apis/
https://react-bootstrap.github.io/components/modal/
https://www.youtube.com/watch?v=voDummz1gO0
https://freefrontend.com/
https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript
