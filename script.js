// create today's date and time variable
var today = moment();

// add date to top of page
$("#currentDay").text(today.format('dddd MMMM Do'));

// set timer interval to audit planner every ten minutes to see if hour has passed
setInterval (function () {
    auditHours(); }, 10000
);

//create task function

$('#hours').on("click", "li", function () {
    
})

// save task function to store local

//audit function to see if hour has passed and assigns color


// new day reload function to clear all tasks at end of the day