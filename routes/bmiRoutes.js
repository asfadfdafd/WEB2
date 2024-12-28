/*******************************************
 * routes/bmiRoutes.js
 *******************************************/
import express from 'express';
import moment from 'moment';

import helmet from 'helmet';
import morgan from 'morgan';

// Use Morgan for logging
app.use(morgan('combined'));

// Use Helmet
app.use(helmet());

const router = express.Router();


// In-memory storage of BMI calculations
const bmiHistory = [];

// Example route to push new BMI result into our in-memory array
router.post('/add', (req, res) => {
  const { bmi, interpretation } = req.body;
  const newEntry = {
    bmi,
    interpretation,
    timestamp: moment().format('LLLL')
  };
  bmiHistory.push(newEntry);
  return res.send({ message: 'BMI added to history' });
});

// Route to view the history
router.get('/', (req, res) => {
  let historyHtml = `<h1>BMI History</h1><ul>`;
  bmiHistory.forEach(entry => {
    historyHtml += `
      <li>
        <strong>${entry.bmi}</strong> (${entry.interpretation}) 
        at ${entry.timestamp}
      </li>`;
  });
  historyHtml += `</ul><a href="/">Go Home</a>`;
  res.send(historyHtml);
});

module.exports = router;
