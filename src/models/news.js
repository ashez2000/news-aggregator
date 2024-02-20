import crypto from 'node:crypto'

export class News {
  constructor(title, content, url, publishedAt, category) {
    this.id = crypto.randomUUID()
    this.title = title
    this.content = content
    this.url = url
    this.publishedAt = publishedAt
    this.category = category
  }
}
