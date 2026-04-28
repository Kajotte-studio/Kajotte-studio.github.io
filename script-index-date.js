const updateClock = () => {
    const now = new Date();
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const datePart = now.toLocaleDateString('en-US', options);
    const timePart = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    const display = document.getElementById('live-timestamp');
    if (display) {
        display.textContent = `${datePart} | ${timePart}`;
    }
};

setInterval(updateClock, 1000);
updateClock();