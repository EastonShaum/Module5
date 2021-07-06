var today = moment()
//console.log(today.format("dddd, MMMM Do"));

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
    //console.log(status + 9);

  // update task in array
  events[status] = text;

  // recreate p element
  var eventP = $("<p>")
    .attr('id', "hour-" + status)
    .addClass("hours-group col-10")
    .text(text);

  // replace textarea with new content
  $(this).replaceWith(eventP);
  status = parseInt(status);
  //console.log(status + 9);
  checkEvent(status);
});



  // blocks in the past are gray

  // current time block is red

  // future time blocks are green

  var checkEvent = function(hour) {
    
      var currentHour = moment().format("H");
      
    
      // remove any old classes from element
      $("#hour-" + hour).removeClass("list-group-item-warning list-group-item-danger");
      console.log(hour);
      console.log(currentHour);


      // apply new class if task is near/over due date
      if (hour + 9 < currentHour) {
        $("#hour-" + hour).addClass("list-group-item-secondary");
      } else if (hour + 9 == currentHour){
        $("#hour-" + hour).addClass("list-group-item-danger");
      } else if (hour + 9 > currentHour) {
        $("#hour-" + hour).addClass("list-group-item-success");
      }
  };

  var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!events) {
      events = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: []
      };
    }
    localStorage.setItem("events", JSON.stringify(events));

    for (i = 0; i < 9 ; i++) {
      checkEvent(i)
      console.log(events[i]);
      $("#hour-" + i).append(events[i] + " ");

      //checkEvent(i);
    };
    //saveAllEvents();
  };

  var createEvent = function(eventText, eventList) {
  
    console.log(eventText);
  
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
  
  var index = 
    $(this)
    .attr("id")
    .replace("save-", "");
    console.log(index);
    
  // get form values
  var eventText = document.getElementById("hour-" + index).textContent;
  console.log(eventText);

  if (eventText) {
    //createEvent(eventText, 0);

    // save in events array
    events[index].push({
      text: eventText
    });

    saveEvents(eventText, index);
  }


});



loadEvents();