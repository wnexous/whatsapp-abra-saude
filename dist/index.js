import express from "express";
var app = express();
app.get("/", function (req, res) {
    console.log("opa eai");
    console.log(req.ip.split(":").pop());
});
app.listen(3000, function () {
    console.log("ouvindo");
});
