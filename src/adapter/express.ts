import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("opa eai");
  console.log(req.ip.split(":").pop());
});

app.listen(3000, () => {
  console.log("ouvindo");
});
