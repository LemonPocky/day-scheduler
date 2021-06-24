function renderPage() {
    showTodaysDate();
    colorBoxes();

    // Create click handler for save boxes that saves events in localStorage
}

// Display today's date at the top of the page
function showTodaysDate() {
    const currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do YYYY'));
}

function colorBoxes() {
    let currentHour = moment().hour();

    // Loop through .time-block divs
    let timeBlocks = $('.time-block');
    timeBlocks.each(function(index) {
        // Get the hour for each box
        // We want to compare numbers, so convert into an integer
        let boxHour = parseInt(this.dataset.hour);
        let timeClass = 'future';

        // Assign "past" class to boxes where box.hour < currentHour
        // Assign "present" class to box where box.hour === currentHour
        // Assign "future" class to boxes where box.hour > currentHour (default)
        if (boxHour < currentHour) {
            timeClass = 'past';
        } else if (boxHour === currentHour) {
            timeClass = 'present';
        }
        $(this).addClass(timeClass);
    });
}

function saveEvent() {
    // Store event in localStorage
}

renderPage();