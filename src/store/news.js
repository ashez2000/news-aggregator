class NewsStore {
  constructor() {
    this._db = []
  }

  // replaces entire news data
  save(news = []) {
    this._db = news
  }

  findMany(categories = []) {
    if (categories.length === 0) {
      return this._db
    }

    return this._db.filter((n) => categories.includes(n.category))
  }

  findById(id) {
    return this._db.find((n) => n.id === id)
  }

  searchNews(keyword = '') {
    return this._db.filter(
      (n) => n.title.contains(keyword) || n.content.contains(keyword)
    )
  }
}

export const newsStore = new NewsStore()
