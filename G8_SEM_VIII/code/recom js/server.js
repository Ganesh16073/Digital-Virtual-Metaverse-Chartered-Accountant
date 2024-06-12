const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const recommendationLogic = require('./recommendation_logic');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/recommend', (req, res) => {
    const recommendation = recommendationLogic.getRecommendation(req.body);
    res.redirect(`/recommendation.html?form=${recommendation}`);
});

app.get('/recommendation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recommendation.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
