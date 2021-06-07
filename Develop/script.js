var today = moment()
console.log(today.format("dddd, MMMM Do"));

$("#currentDay").append(today.format("dddd, MMMM Do YYYY"));

var events = [];


// event text was clicked
$(".hours-group").on("click", function() {
    console.log("click");
    // get current text of p element
    var text = $(this)
      .text()
      .trim();

    var status = $(this)
      .closest(".hours-group")
      .attr("id")
      .replace("hour-", "");
    console.log(status);
    // replace p element with a new textarea
    var textInput = $("<textarea>")
      .attr('id', "hour-" + status)
      .addClass("form-control")
      .val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
  });

// editable field was un-focused
$(document).on("blur", ".form-control", function() {
  
  // get current value of textarea
  var text = $(this).val();
  
  // get status type and position in the list
  var status = $(this)
    
    .attr("id")
    .replace("hour-", "");
    console.log(status);

  // update task in array
  events[status] = text;

  localStorage.setItem("events", JSON.stringify(events));

  // recreate p element
  var eventP = $("<p>")
    .attr('id', "hour-" + status)
    .addClass("hours-group col-10")
    .text(text);

  // replace textarea with new content
  $(this).replaceWith(eventP);
});



  // blocks in the past are gray

  // current time block is red

  // future time blocks are green

// var checkEvent = function(hour) {
  
//     var currentHour = moment().format("H");
    
  
//     // remove any old classes from element
//     $(eventEl).removeClass("list-group-item-warning list-group-item-danger");
  
//     // apply new class if task is near/over due date
//     if (moment().isAfter(time)) {
//       $(eventEl).addClass("list-group-item-danger");
//     } else if (Math.abs(moment().diff(time, "days")) <= 2) {
//       $(eventEl).addClass("list-group-item-warning");
//     }
//  };

  var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!events) {
      events = {
        0: ["Wake up, Eat breakfast"],
        1: ["First appointment"],
        2: [],
        3: ["Lunch"],
        4: [],
        5: ["Second appointment"],
        6: [],
        7: [],
        8: ["Go home"]
      };
    }
    localStorage.setItem("events", JSON.stringify(events));

    for (i = 0; i < 9 ; i++) {

      console.log(events[i]);
      $("#hour-" + i).append(events[i] + " ");

      //checkEvent(i);
    };
    //saveAllEvents();
  };

  var createEvent = function(eventText, eventList) {
    // create elements that make up a task item
    // var eventP = $("<p>")
    //   .text(eventText);
    console.log(eventText);
    // check due date
    //checkEvent();
  
    // append to the page
    $("#hour-" + eventList).append(eventP);
    console.log(eventP);
    console.log(eventList);
  };

  var saveEvents = function(hour, text) {
    var events = JSON.parse(localStorage.getItem(events));
    events[hour] = text
    localStorage.setItem("events", JSON.stringify(events));
  };

// repeat for every save button or is there a faster way?
  // save button was clicked
$(".saveBtn").click(function() {
  console.log("save clicked");
  
  var index = 0
    // $(this)
    // .closest("p")
    // .attr("id")
    // .replace("hour-", "");
    console.log(index);
    
  // get form values
  var eventText = document.getElementById("hour-" + index).textContent;
  console.log(eventText);

  if (eventText ) {
    createEvent(eventText, 0);

    // save in events array
    events[index].push({
      text: taskText
    });

    saveEvents();
  }
});



loadEvents();