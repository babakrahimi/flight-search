const cors = require("cors");
const express = require("express");

const app = express();
const port = 3002;

const fs = require("fs");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/price-offer", (req, res) => {
  writeMockData("./mock-data.json", res);
});

app.get("/airports", (req, res) => {
  writeMockData("./mock-airports.json", res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function writeMockData(path, res) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong.");
    } else {
      res.json(JSON.parse(data));
    }
  });
}
