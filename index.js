const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors()); // This will add CORS headers to every response

app.get("/api/json", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer': url
      }
    });
    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      timestamp: new Date().toISOString(),
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
      },
      data: response.data
    });
  } catch (e) {
    res.status(500).send({ message: "Error fetching url", error: e });
  }
});

app.get("/api", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer': url
      }
    });
    res.send(response.data);
  } catch (e) {
    res.status(500).send({ message: "Error fetching url", error: e });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
