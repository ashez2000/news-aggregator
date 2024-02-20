import crypto from 'node:crypto'
import axios from 'axios'
import { NEWS_API_KEY } from '../env.js'

// news api endpoint
const url = (category) =>
  `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=10`

// fetches news from api based on category
// also transforms to app domain model for news
export const fetchNewsByCategory = async (category) => {
  const res = await axios.get(url(category), {
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  })

  const news = res.data.articles.map((i) => ({
    id: crypto.randomUUID(),
    title: i.title,
    content: i.content,
    url: i.url,
    publishedAt: i.publishedAt,
    category,
  }))

  return news
}

// fetch news from all categories
export const fetchNews = async () => {
  // available categories from the api
  const categories = [
    'general',
    'business',
    'sports',
    'technology',
    // 'health',
    // 'entertainment',
    // 'science',
  ]

  const news = categories.map((c) => fetchNewsByCategory(c))
  const res = await Promise.all(news)

  return res.flat()
}
