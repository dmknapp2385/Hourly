// create today's date and time variable
var today = moment();
var tasksArray = [];
var currentHour = parseInt(moment().format("H"));

// add date to top of page
$("#currentDay").text(today.format('dddd MMMM Do'));

// set timer interval to audit planner every ten minutes to see if hour has passed
// setInterval (function () {
//     auditHours(); }, 10000
// );

//create task function
$('.row').on("click", ".saveBtn", function () {
    var textarea = $(this).prev();
    //get text from text area
    var text = textarea.val().trim();
    // get id from text area
    var hour = textarea.attr("id");
    // push to taskArray as object with hour and text
    var taskObj = {hour:hour, task: text};
    tasksArray.push(taskObj);
    // save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
});

//loop through rows to see if time has passed if hour has passed and assigns color
var auditHours = function () {
    $("textarea").each(function() {
        // get id to convert to hour
        var hour = parseInt($(this).attr("id"));
        if (hour <= 5 && hour >= 1) {
            hour += 12;
        }
        console.log(hour);
        // switch to compare to current time
            switch (hour) {
                case hour < currentHour:
                    $(this).addClass("past");
                    break;
                case hour === currentHour:
                    $(this).addClass("present");
                    break;
                default:
                    $(this).addClass("future");
                    break;
       }
    });
}
    

    // if beyond 5, new day reload  

// load task function takes local storage and displays
var loadTasks = function () {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
    // loop through array
    $.each(tasksArray, function(index, task) {
        //get id and text
        var id=task.hour;
        var text = task.task;
        // assign to text area with corresponding id
        $("#" + id).val(text);
        // audit hours
        auditHours();
    })
}

loadTasks();

// new day reload function to clear all tasks at end of the day
