# mockapi-json-server
> Mockapi based on json-server with data wrapping and pagination support.

## Features

- ✅ **Data Wrapping**: All responses are wrapped in a `data` field
- ✅ **Total Count**: List queries include a `total` field for pagination
- ✅ **Pagination Support**: Support for `_page`, `_limit`, and `_per_page` parameters
- ✅ **Search**: Field-specific search using `_q` parameter
- ✅ **Rich Data**: 100+ posts, 200 comments, 20 users, 15 categories, and 30 tags

## Quick Start

### Initialize Database
```sh
cp src/db.sample.json src/db.json
```

### Generate Mock Data (100+ posts)
```sh
node generate-data.js
```

### Start Server
```sh
npm start
```

The server will start at `http://localhost:3000`

## API Response Format

### List Query
```json
{
  "data": [...],
  "total": 100
}
```

### Single Item
```json
{
  "data": {...}
}
```

### Pagination
```json
{
  "data": [...10 items...],
  "total": 100
}
```

## Available Endpoints

### Posts
- `GET /posts` - List all posts
- `GET /posts?_page=1&_per_page=10` - Paginated posts
- `GET /posts?_q=javascript` - Search posts by title
- `GET /posts/:id` - Get single post
- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /comments` - List all comments
- `GET /comments?_q=comment` - Search comments by text
- `GET /comments/:id` - Get single comment
- `POST /comments` - Create comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get single user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get single category

### Tags
- `GET /tags` - List all tags
- `GET /tags/:id` - Get single tag

## Pagination Parameters

- `_page` - Page number (default: 1)
- `_limit` - Items per page (default: 10)
- `_per_page` - Alternative to `_limit` (same functionality)
- `_start` - Start index (for custom pagination)

### Examples
```bash
# Get first page with 10 items
GET /posts?_page=1&_per_page=10

# Get second page with 20 items
GET /posts?_page=2&_limit=20

# Get items starting from index 5
GET /posts?_start=5&_limit=10
```

## Search Parameters

- `_q` - Search query (searches in specific fields)
- For posts: searches in `title` field
- For comments: searches in `text` field

### Examples
```bash
# Search posts by title
GET /posts?_q=javascript

# Search comments by text
GET /comments?_q=great
```

## Data Generation

The `generate-data.js` script creates:
- **100 posts** with various topics (JavaScript, React, Node.js, etc.)
- **200 comments** with realistic content
- **20 users** with profiles and social links
- **15 categories** for organizing content
- **30 tags** for flexible filtering

### Customizing Generated Data

Edit `generate-data.js` to customize:
```javascript
const POST_COUNT = 100;      // Change number of posts
const COMMENT_COUNT = 200;   // Change number of comments
const USER_COUNT = 20;       // Change number of users
```

## HTTP Test Files

Test the API using the provided HTTP files in the `apis/` directory:
- `apis/01-post.http` - Post-related endpoints

## Features

### Data Wrapping
All API responses are wrapped in a `data` field for consistent response format.

### Total Count
List queries include a `total` field showing the total number of items.

### Multi-Parameter Pagination
Support for various pagination parameters (`_page`, `_limit`, `_per_page`, `_start`).

### Field-Specific Search
Search functionality that targets specific fields in resources.

## License

MIT