var today = moment()
console.log(today.format("dddd, MMMM Do"));

$("#currentDay").append(today.format("dddd, MMMM Do YYYY"));

var events = {};


//make blocks editable and save into local storage with save button

// task text was clicked
$(".hours-group").on("click", "p", function() {
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
  
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
  });

// blocks in the past are gray

// current time block is red

// future time blocks are green

// var checkEvent = function(eventEl) {
//     // get check hour from event element
//     var date = $(taskEl)
//       .find("span")
//       .text()
//       .trim();
  
//     // convert to moment object at 5:00pm
//     var time = moment(date, "L").set("hour", 17);
  
//     // remove any old classes from element
//     $(taskEl).removeClass("list-group-item-warning list-group-item-danger");
  
//     // apply new class if task is near/over due date
//     if (moment().isAfter(time)) {
//       $(taskEl).addClass("list-group-item-danger");
//     } else if (Math.abs(moment().diff(time, "days")) <= 2) {
//       $(taskEl).addClass("list-group-item-warning");
//     }
//  };

  var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!events) {
      events = {
        NineAm: ["hello"],
        TenAm: [],
        ElevenAm: [],
        TwelvePm: [],
        OnePm: [],
        TwoPm: [],
        ThreePm: [],
        FourPm: [],
        FivePm: []
      };
    }
  }

loadEvents();