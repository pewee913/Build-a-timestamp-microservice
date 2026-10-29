import express from "express";
import cors from "cors";

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Timestamp endpoint
app.get("/api{/:date}", function (req, res) {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else if (/^-?\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date, 10));
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 8000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});