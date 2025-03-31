Here’s a **complete and polished `README.md`** tailored to your updated Express.js NLP Feedback API that supports **batch input**, **surprise detection**, **sentiment scoring**, and **report generation**, with built-in Swagger documentation.

---

```markdown
# 🧠 NLP Feedback API

A lightweight and powerful Express.js API for processing user feedback using Natural Language Processing (NLP). This API detects **surprise expressions**, performs **sentiment analysis**, and generates **summary reports**. Designed for quick integration, API testing, and open source usage.

---

## 🚀 Features

- 🔄 Submit multiple feedbacks in one request
- 😲 Detect surprise sentiment using keywords and adjectives
- 📈 Analyze feedback using `natural` sentiment scoring
- 📋 Track general user comments
- 📊 Generate real-time feedback and surprise reports
- 🧪 Swagger API docs for easy testing

---

## 📦 Installation

```bash
git clone https://github.com/your-username/nlp-feedback-api.git
cd nlp-feedback-api
npm install
node app.js
```

---

## 🌐 API Access

- API Summary: [http://localhost:3000/report](http://localhost:3000/report)
- API Docs (Swagger UI): [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🧪 API Endpoints

### 🔹 `POST /feedback-batch`

Submit multiple feedback entries for NLP analysis.

#### 📤 Example Request Body:

```json
{
  "feedbacks": [
    { "user": "Alice", "message": "Wow, amazing job!" },
    { "user": "Bob", "message": "No way this is real!" },
    { "user": "Charlie", "message": "The app is okay, could be better." }
  ]
}
```

#### ✅ Example Response:

```json
{
  "message": "Batch feedback processed",
  "summary": {
    "total": 3,
    "surprise_count": 2,
    "normal_count": 1,
    "avg_sentiment": "2.67"
  },
  "data": [
    {
      "user": "Alice",
      "message": "Wow, amazing job!",
      "surprise": true,
      "sentimentScore": 3,
      "adjectives": ["amazing"],
      "timestamp": "2025-03-31T..."
    },
    ...
  ]
}
```

---

### 🔹 `POST /comment`

Submit a general user comment (not analyzed for surprise or sentiment).

#### 📤 Example Request Body:

```json
{
  "user": "John",
  "comment": "Looking forward to more updates!"
}
```

---

### 🔹 `GET /report`

Retrieve a complete report including:
- Total feedbacks
- Surprise count
- Average sentiment score
- All feedback entries
- All comments

---

## 🛠 Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| **Express.js** | API server framework             |
| **Compromise** | Extract adjectives from text     |
| **Natural**    | Sentiment analysis and NLP       |
| **Swagger UI** | API documentation and testing    |

---

## 🧰 Development Tips

- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test APIs
- Restart server after code changes: `Ctrl+C` → `node app.js`
- Add CORS middleware if using from a frontend

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---

## ✨ Contributions Welcome!

Feel free to fork, improve, or open issues. Let’s make it smarter together!
```
