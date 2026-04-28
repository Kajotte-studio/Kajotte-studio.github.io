const updateClock = () => {
    const now = new Date();
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const timeOptions = { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    const datePart = now.toLocaleDateString('en-US', dateOptions);
    const timePart = now.toLocaleTimeString('en-US', timeOptions);

    const dateDisplay = document.getElementById('date-box');
    const timeDisplay = document.getElementById('time-box');

    if (dateDisplay && timeDisplay) {
        dateDisplay.textContent = datePart;
        timeDisplay.textContent = timePart;
    }
};

setInterval(updateClock, 1000);
updateClock();