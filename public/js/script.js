// public/js/script.js

function validateForm() {
    const height = document.getElementById('height').value.trim();
    const weight = document.getElementById('weight').value.trim();
    const age = document.getElementById('age').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const unit = document.getElementById('unit').value.trim();
  
    if (!height || !weight || !age || !gender || !unit) {
      alert('Please fill out all fields before submitting.');
      return false;
    }
  
    // Additional Validation
    if (height <= 0 || weight <= 0 || age <= 0) {
      alert('Please enter positive numbers for height, weight, and age.');
      return false;
    }
  
    return true;
  }
  
  function toggleUnits() {
    const unitSelect = document.getElementById('unit').value;
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');
  
    if (unitSelect === 'metric') {
      heightUnit.textContent = 'cm';
      weightUnit.textContent = 'kg';
    } else if (unitSelect === 'imperial') {
      heightUnit.textContent = 'inches';
      weightUnit.textContent = 'lbs';
    }
  }
  // Dark Mode Toggle

  document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
  
    // Check saved preference
    if (localStorage.getItem("dark-mode") === "enabled") {
      body.classList.add("dark-mode");
      body.classList.remove("bg-light"); // Remove bg-light for Dark Mode
      darkModeToggle.textContent = "Light Mode";
    }
  
    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("bg-light"); // Add bg-light back for Light Mode
        localStorage.setItem("dark-mode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
      } else {
        body.classList.add("dark-mode");
        body.classList.remove("bg-light"); // Remove bg-light for Dark Mode
        localStorage.setItem("dark-mode", "enabled");
        darkModeToggle.textContent = "Light Mode";
      }
    });
  });
  