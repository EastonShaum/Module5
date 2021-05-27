var today = moment()
console.log(today.format("dddd, MMMM Do"));

$("#currentDay").append(today.format("dddd, MMMM Do YYYY"));

var events = {};



// task text was clicked
$(".hours-group").on("click", "p", function() {
    console.log("click");
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

// editable field was un-focused
$(".hours-group").on("blur", "textarea", function() {
  console.log("click off");
  // get current value of textarea
  var text = $(this).val();

  // get status type and position in the list
  var status = $(this)
    .closest(".hours-group")
    .attr("id")
    .replace("list-", "");
  var index = $(this)
    .closest(".list-group-item")
    .index();

  // update task in array and re-save to localstorage
  events[status][index].text = text;

  // recreate p element
  var eventP = $("<p>")
    .addClass("m-1")
    .text(text);

  // replace textarea with new content
  $(this).replaceWith(eventP);
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
        0: ["Wake up"],
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
    for (i = 0; i < 9 ; i++) {
      console.log(events[i]);
      $("#hour-" + i).append(events[i]);
    };
    // // loop over object properties
    // $.each(events, function(list, arr) {
    //   // then loop over sub-array
    //   arr.forEach(function(event) {
    //  console.log(events[0]);
    //     $("#hour-" + eventList).append(event[arr]);
    //     createEvent(event.text, list);
    //   });
    // });
  };

  var createEvent = function(eventText, eventList) {
    // create elements that make up a task item
    // var eventP = $("<p>")
    //   .text(eventText);
    console.log(eventText);
    // check due date
    //auditTask(taskLi);
  
    // append to ul list on the page
    $("#hour-" + eventList).append(eventP);
    console.log(eventP);
    console.log(eventList);
  };

loadEvents();