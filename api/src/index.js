const mongoose = require("mongoose");

const app = require("./app");

const port = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/raftlabs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  });
