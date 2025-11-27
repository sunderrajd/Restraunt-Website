import app from "./app.js";
app.listen(process.env.PORT, () => {
  console.log(`Server running On port ${process.env.PORT}`);
});
