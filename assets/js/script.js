function renderPage() {
    colorBoxes();

    // Create click handler for save boxes that saves events in localStorage
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