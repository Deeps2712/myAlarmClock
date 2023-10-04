// An array to store all the set alarms.
let alarms = [];

// Creating an audio object with the path to the alarm audio file.
const alarmAudio = new Audio('assets/audio/audio.mp3');

// Function to update the time on the clock and check for alarms.
function updateTime() {
    // Getting the clock HTML element to display the time.
    const clock = document.getElementById('clock');

    // Creating a new Date object to work with the current time.
    const now = new Date();

    // Extracting hours, minutes, and seconds from the Date object.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Determining whether it's AM or PM.
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Displaying the time in the clock element, formatted as HH:MM:SS AM/PM.
    clock.textContent = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    
    // Looping through all set alarms.
    alarms.forEach((time, index) => {
        // If the current time matches an alarm time...
        if(time.h == hours && time.m == minutes && time.s == seconds) {
            // Play the alarm audio.
            alarmAudio.play();

            // Show an alert in the browser.
            alert('Time is up!');

            // Pause and rewind the alarm audio when the alert is dismissed.
            alarmAudio.pause();
            alarmAudio.currentTime = 0;

            // Remove the triggered alarm from the alarms array.
            alarms.splice(index, 1);
            
            // Update the displayed list of alarms.
            displayAlarms();
        }
    });
}

// Function to set an alarm based on user input.
function setAlarm() {
    // Retrieving the values input by the user.
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const second = document.getElementById('second').value;
    const ampm = document.getElementById('ampm').value;

    // Converting the 12-hour format to 24-hour format if it's PM.
    const alarmHour = ampm === 'PM' ? parseInt(hour) + 12 : parseInt(hour);

    // Adding the new alarm to the alarms array.
    alarms.push({h: alarmHour, m: parseInt(minute), s: parseInt(second)});
    
    // Updating the displayed list of alarms.
    displayAlarms();
}

// Function to display all set alarms.
function displayAlarms() {
    // Getting the alarmsList HTML element to display the alarms.
    const alarmsList = document.getElementById('alarmsList');
    
    // Clearing the current list of alarms.
    alarmsList.innerHTML = '';

    // Looping through all set alarms.
    alarms.forEach((alarm, index) => {
        // Creating a list item for each alarm.
        const li = document.createElement('li');
        li.textContent = `${alarm.h % 12 || 12}:${alarm.m.toString().padStart(2, '0')}:${alarm.s.toString().padStart(2, '0')} ${alarm.h >= 12 ? 'PM' : 'AM'}`;
        
        // Creating a delete button for each alarm.
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            // Removing the alarm from the alarms array when the delete button is clicked.
            alarms.splice(index, 1);
            
            // Updating the displayed list of alarms.
            displayAlarms();
        };
        // Appending the delete button to the list item and the list item to the alarms list.
        li.appendChild(deleteButton);
        alarmsList.appendChild(li);
    });
}

// Function to stop the alarm audio.
function stopAlarm() {
    // Pausing and rewinding the alarm audio.
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
}

// Updating the clock every second (1000 milliseconds).
setInterval(updateTime, 1000);
