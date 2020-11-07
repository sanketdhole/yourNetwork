const mongoose = require("mongoose");

const app = require("./app");

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    mongoose.set("useFindAndModify", false);
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  });
