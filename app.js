const express = require('express');
const natural = require('natural');
const nlp = require('compromise');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In-memory storage
const feedbackData = [];
const comments = [];

// NLP tools setup
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Surprise detection logic
function detectSurprise(text) {
  const surpriseKeywords = ['wow', 'amazing', 'unbelievable', 'no way', 'incredible', 'shocked', 'unexpected'];
  const doc = nlp(text);
  const adjectives = doc.adjectives().out('array').map(a => a.toLowerCase());
  const loweredText = text.toLowerCase();
  const keywordMatch = surpriseKeywords.some(keyword => loweredText.includes(keyword));
  const adjectiveMatch = adjectives.some(adj => surpriseKeywords.includes(adj));
  const sentimentScore = analyzer.getSentiment(text.split(' '));

  return {
    surprise: keywordMatch || adjectiveMatch || sentimentScore > 2,
    sentimentScore,
    adjectives
  };
}

/**
 * @swagger
 * /feedback-batch:
 *   post:
 *     summary: Submit multiple feedbacks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbacks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     message:
 *                       type: string
 *     responses:
 *       201:
 *         description: Batch feedback processed with summary
 */
app.post('/feedback-batch', (req, res) => {
  const feedbacks = req.body.feedbacks;

  if (!Array.isArray(feedbacks)) {
    return res.status(400).json({ error: 'Feedbacks must be an array' });
  }

  let surpriseCount = 0;
  let sentimentTotal = 0;

  const processed = feedbacks.map(({ user, message }) => {
    const analysis = detectSurprise(message);

    if (analysis.surprise) surpriseCount++;
    sentimentTotal += analysis.sentimentScore;

    const result = {
      user,
      message,
      surprise: analysis.surprise,
      sentimentScore: analysis.sentimentScore,
      adjectives: analysis.adjectives,
      timestamp: new Date()
    };

    feedbackData.push(result);
    return result;
  });

  const summary = {
    total: feedbacks.length,
    surprise_count: surpriseCount,
    normal_count: feedbacks.length - surpriseCount,
    avg_sentiment: (sentimentTotal / feedbacks.length).toFixed(2)
  };

  res.status(201).json({
    message: 'Batch feedback processed',
    summary,
    data: processed
  });
});

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Submit a comment
 */
app.post('/comment', (req, res) => {
  const { user, comment } = req.body;

  if (!user || !comment) {
    return res.status(400).json({ error: 'Missing user or comment' });
  }

  const entry = {
    user,
    comment,
    timestamp: new Date()
  };

  comments.push(entry);

  res.status(201).json({ message: 'Comment added', data: entry });
});

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Get feedback summary report
 */
app.get('/report', (req, res) => {
  const total = feedbackData.length;
  const surprised = feedbackData.filter(f => f.surprise).length;
  const sentimentAvg = feedbackData.length
    ? (feedbackData.reduce((sum, f) => sum + f.sentimentScore, 0) / feedbackData.length).toFixed(2)
    : 0;

  res.json({
    summary: {
      total_feedbacks: total,
      surprise_count: surprised,
      normal_count: total - surprised,
      avg_sentiment: sentimentAvg
    },
    feedbacks: feedbackData,
    comments
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/docs`);
});
