const userDash = document.querySelector('#userDash');
const pastTravel = document.querySelector('#pastTravel');





export const displayCurrentTraveler = (current, currentTrips) => {
    console.log(current, 'current');
    console.log(currentTrips, 'current trips')
    userDash.innerText = current.name;
    currentTrips.forEach(element => {
        pastTravel.innerHTML += element.status;
    })
}