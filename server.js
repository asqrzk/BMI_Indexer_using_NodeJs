const app = require("./index");
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("We're live on port 4k");
});