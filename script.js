var tasksArray = [];

// add date to top of page
$("#currentDay").text(moment().format('dddd MMMM Do'));

// set timer interval to audit planner every ten minutes to see if hour has passed
setInterval (function () {
    auditHours(); }, 10000
);

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
        // var currentHour = parseInt(moment().format("H"));  
        var currentHour = 18;  
        // if/else to compare to current time
        if (hour < currentHour) {
            $(this).addClass("past");
            console.log(hour < currentHour);
        }
        else if (hour === currentHour) {
            $(this).addClass("present");
        }

        else if (hour > currentHour && hour < 18) {
            $(this).addClass("future");
        }

        else if (hour === 18) {
            return removeTasks();
        }
    }) 
};
    

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
    })
    auditHours();
}

loadTasks();

// if beyond 5, new day reload  
var removeTasks = function() {
    $("textarea").each(function() {
        $(this).val("");
    })
    localStorage.clear();
}

// new day reload function to clear all tasks at end of the day
