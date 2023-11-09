const userDash = document.querySelector('#userDash')






export const displayCurrentTraveler = current => {
    console.log(current)
    userDash.innerText = current.name
}