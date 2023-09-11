const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { DateTime } = require("luxon"); // Luxon library for date and time handling

app.get("/get_info", (req, res) => {
  const slack_name = req.query.slack_name || "Aminu Muhammed-lawal";
  const track = req.query.track || "backend";

  // Get the current day of the week
  const current_day = DateTime.now().toLocaleString({ weekday: "long" });

  // Calculate the current UTC time with validation of +/-2 hours
  const utc_offset = parseInt(req.query.utc_offset || "0");
  if (isNaN(utc_offset) || utc_offset < -2 || utc_offset > 2) {
    return res.status(400).json({ error: "Invalid UTC offset" });
  }
  const utc_time = DateTime.now().plus({ hours: utc_offset }).toISO();

  // GitHub URLs
  const github_file_url =
    "https://github.com/Amin0001/BackendTask1/main/app.js";
  const github_repo_url = "https://github.com/Amin0001/BackendTask1";

  // Create the JSON response
  const response_data = {
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code: 200,
  };

  res.json(response_data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
