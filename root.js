import express from 'express';
import chalk from 'chalk';
import moment from 'moment';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker'; // Import faker for vehicle names
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator'; // Import unique-names-generator
import morgan from 'morgan'; // Optional: For logging HTTP requests

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON data if needed

// Use Morgan for logging HTTP requests (optional)
app.use(morgan('combined'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ------------------ ROUTES ------------------

// Home route ("/"): render home.ejs
app.get('/', (req, res) => {
  res.render('home');
});

// GET /bmicalculator: render bmiCalculator.ejs
app.get('/bmicalculator', (req, res) => {
  res.render('bmiCalculator');
});

// POST /bmicalculator: handle BMI calculations and render bmiResult.ejs
app.post('/bmicalculator', (req, res) => {
  const { height, weight, age, gender, unit } = req.body;

  // Simple validation
  if (!height || !weight || !age || !gender || !unit) {
    return res.status(400).send('Please fill all fields properly!');
  }

  // Convert strings to numbers
  const numericHeight = parseFloat(height);
  const numericWeight = parseFloat(weight);

  let bmi;

  // BMI Calculation
  if (unit === 'metric') {
    // Assume height is in centimeters
    const heightInMeters = numericHeight / 100;
    bmi = numericWeight / (heightInMeters ** 2);
  } else {
    // Imperial: height in inches, weight in pounds
    bmi = (numericWeight / (numericHeight ** 2)) * 703;
  }

  // Round to 2 decimal places
  const bmiRounded = bmi.toFixed(2);

  // Interpret BMI
  let interpretation;
  if (bmi < 18.5) {
    interpretation = 'Underweight';
  } else if (bmi < 25) {
    interpretation = 'Normal weight';
  } else if (bmi < 30) {
    interpretation = 'Overweight';
  } else {
    interpretation = 'Obese';
  }

  // Chalk + moment example
  console.log(chalk.green(`BMI Calculation done at ${moment().format('LLLL')}`));
  console.log(chalk.blue(`User BMI = ${bmiRounded}, Interpretation: ${interpretation}`));

  // Render the result using EJS
  res.render('bmiResult', {
    age,
    gender,
    bmi: bmiRounded,
    interpretation,
  });
});

// GET /cars: generate two random car names and render cars.ejs
app.get('/cars', (req, res) => {
  const car1 = faker.vehicle.vehicle(); // Random car name from faker
  const car2 = uniqueNamesGenerator({
    dictionaries: [adjectives, colors], // Simulated car name
    separator: ' ',
  });

  res.render('cars', { car1, car2 });
});

// 404 Handler: render 404.ejs for undefined routes
app.use((req, res) => {
  res.status(404).render('404');
});

// ------------------ SERVER SETUP ------------------

// Start server on specified port
app.listen(port, () => {
  console.log(chalk.yellow(`Server is running at http://localhost:${port}`));
});
