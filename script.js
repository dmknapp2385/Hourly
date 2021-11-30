// create today's date and time variable
var today = moment(); 
console.log(today);

$("#currentDay").text(today.format('MMM Do YYYY'));