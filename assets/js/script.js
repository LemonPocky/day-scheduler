function renderPage() {
    showTodaysDate();
    colorBoxes();
    loadLocalStorage();
    // Create click handler for save boxes that saves events in localStorage
    createSaveHandlers();
}

// Display today's date at the top of the page
function showTodaysDate() {
    const currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do YYYY'));
}

// Colors boxes according to time by reassigning their class
function colorBoxes() {
    const currentHour = moment().hour();

    // Loop through .time-block divs
    const timeBlocks = $('.time-block');
    timeBlocks.each(function(index) {
        // Get the hour for each box
        // We want to compare numbers, so convert into an integer
        const boxHour = parseInt(this.dataset.hour);
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

// Display data from localStorage, if any
function loadLocalStorage() {
    // Return empty array if getItem returns null
    let schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
    if (schedule.length === 0) {
        schedule = initLocalStorage();        
    }

    // Display data from localStorage
    for (let i = 0; i <= 8; i++) {
        // Schedule starts at hour 9
        const currentHour = i + 9; 
        const box = $('#hour-' + currentHour);
        // Set the description of the time block to the saved description
        let description = schedule[i];
        box.find('.description').text(description);
    }
}

// Saves an empty schedule in localStorage
function initLocalStorage() {
    const schedule = [];
    for (let i = 0; i <= 8; i++) {
        // All descriptions in schedule are empty            
        schedule.push('');
    }
    // Save empty schedule in localStorage
    localStorage.setItem('schedule', JSON.stringify(schedule));
    return schedule;
}

function createSaveHandlers() {
    const container = $('#schedule-container');
    container.on('click', '.saveBtn', saveEvent);
}

function saveEvent() {
    // Store event in localStorage
    const description = $(this).siblings('.description').val();
    const thisHour = $(this).parent().data('hour');
    
    // Load from localStorage
    // Return empty array if getItem returns null
    let schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
    if (schedule.length === 0) {
        // If localStorage wasn't initialized for some reason, do it now
        schedule = initLocalStorage();
    }

    schedule[thisHour - 9] = description.trim();
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

renderPage();