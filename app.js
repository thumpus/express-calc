const express = require('express');
const app = express();
const convertToInt = require('./helpers');
const ExpressError = require("./expressError")


app.get('/mean', (req, res) => {
    if (!req.query.nums){
        throw new ExpressError("Must pass values into the query string.", 400);
    }
    let nums = req.query.nums.split(',');
    let converted = convertToInt(nums);
    if (converted instanceof Error) {
        throw new ExpressError(converted.message);
      }
    let sum = 0;
    for (num of converted){
        sum += num;
    }
    let mean = sum / converted.length;
    let result = {
        operation: 'Mean',
        result: mean
    }

    return res.send(result);
})

app.get('/median', (req, res) => {
    if (!req.query.nums){
        throw new ExpressError("Must pass values into the query string.", 400);
    }
    let nums = req.query.nums.split(',');
    let converted = convertToInt(nums);
    if (converted instanceof Error) {
        throw new ExpressError(converted.message);
      }
    converted.sort((a, b) => a - b);
    let middle = Math.floor(nums.length/2);
    let median;

    if (nums.length % 2 === 0) {
        median = (nums[middle] + nums[middle - 1]) / 2;
    } else {
        median = nums[middle];
    }
    let result = {
        operation: 'Median',
        result: median
    };
    return res.send(result);
})

app.get('/mode', (req, res) => {
    if (!req.query.nums){
        throw new ExpressError("Must pass values into the query string.", 400);
    }
    let nums = req.query.nums.split(',');
    let converted = convertToInt(nums);
    if (converted instanceof Error) {
        throw new ExpressError(converted.message);
      }

    let counts = {}
    converted.forEach(function(e){
        if(counts[e] === undefined){
            counts[e] = 0
        }
        counts[e] += 1
    })
    let modeCount = 0;
    let mode = 0;
    let countsKeys = Object.keys(counts);
    let countsVals = Object.values(counts);
    for (let i = 0; i < countsKeys.length; i++){
        if (countsVals[i] > modeCount){
            modeCount = countsVals[i];
            mode = countsKeys[i];
        }
    }

    let result = {
        operation: 'Mode',
        result: mode
    }

    return res.send(result);
})

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  
  /** general error handler */
  
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})