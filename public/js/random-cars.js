import carNames from 'car-names'; // Import the npm package (or your own car list module)

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const carDisplay = document.getElementById('car-display');
  const button = document.getElementById('random-car-button');

  button.addEventListener('click', () => {
    // Generate two random car names
    const cars = carNames.random(2); // Assuming the package supports a `random` method
    carDisplay.innerHTML = `
      <p>Car 1: <strong>${cars[0]}</strong></p>
      <p>Car 2: <strong>${cars[1]}</strong></p>
    `;
  });
});
