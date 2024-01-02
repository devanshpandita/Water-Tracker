// Retrieve stored data from localStorage
var storedData = JSON.parse(localStorage.getItem("waterIntakeData")) || {};

function logWaterIntake() {
    var weight = document.getElementById("weight").value;
    var intakeGoal = document.getElementById("intakeGoal").value;
    var wakeUpTime = document.getElementById("wakeUpTime").value;
    var sleepTime = document.getElementById("sleepTime").value;
    var waterAmount = document.getElementById("waterAmount").value;

    // Store the data locally
    storedData = {
        weight: weight,
        intakeGoal: intakeGoal,
        wakeUpTime: wakeUpTime,
        sleepTime: sleepTime,
        waterIntake: parseInt(waterAmount) + (storedData.waterIntake || 0) // Add to existing water intake
    };

    // Save data to localStorage
    localStorage.setItem("waterIntakeData", JSON.stringify(storedData));

    // Calculate remaining water to drink
    var remainingWater = storedData.intakeGoal - storedData.waterIntake;

    // Update progress bar and text
    updateProgressBar(remainingWater);

    // Display remaining water
    document.getElementById("remainingWater").textContent = remainingWater + " ml";
}

function updateProgressBar(remainingWater) {
    var progressBar = document.getElementById("progress-bar");
    var progressSlider = document.getElementById("progress-slider");
    var progressText = document.getElementById("progress-text");
    
    var percentage = (remainingWater / storedData.intakeGoal) * 100;
    progressBar.style.width = percentage + "%";
    progressSlider.style.left = percentage + "%";

    if (remainingWater <= 0) {
        progressText.innerHTML = "You've reached your water intake goal!";
    } else {
        progressText.innerHTML = "Remaining: <span id='remainingWater'>" + remainingWater + "</span> ml";
    }
}

// Initialize the progress bar with stored data
if (storedData.intakeGoal) {
    var remainingWater = storedData.intakeGoal - (storedData.waterIntake || 0);
    updateProgressBar(remainingWater);
    document.getElementById("remainingWater").textContent = remainingWater + " ml";
}

// Set up a notification every 1 hour
setInterval(function() {
    alert("Remember to drink water!");
}, 60 * 60 * 1000); // 1 hour in milliseconds
