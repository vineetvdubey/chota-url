const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/urls', require('./urls/urls'));

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
  console.log('Started chota-url service');
});
