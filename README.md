1. Authentication

1.1 Register User

POST /api/auth/register

Description: Registers a new user with the platform. It validates user data and saves it to the database.

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

Success (201):

{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}

Failure (400):

{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}

1.2 Login User

POST /api/auth/login

Description: Authenticates a user with their email and password and generates a JWT token.

Request Body:

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

Success (200):

{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}

Failure (401):

{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}

2. Blog Management

2.1 Create Blog

POST /api/blogs

Description: Allows a logged-in user to create a blog by providing a title and content.

Request Header:
Authorization: Bearer <token>

Request Body:

{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}

Response:

Success (201):

{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

2.2 Update Blog

PATCH /api/blogs/:id

Description: Allows a logged-in user to update their own blog by its ID.

Request Header:
Authorization: Bearer <token>

Request Body:

{
  "title": "Updated Blog Title",
  "content": "Updated content."
}

Response:

Success (200):

{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

2.3 Delete Blog

DELETE /api/blogs/:id

Description: Allows a logged-in user to delete their own blog by its ID.

Request Header:
Authorization: Bearer <token>

Response:

Success (200):

{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}

2.4 Get All Blogs (Public)

GET /api/blogs

Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

Query Parameters:

search: Search blogs by title or content (e.g., search=blogtitle).

sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).

sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).

filter: Filter blogs by author ID (e.g., filter=authorId).

Example Request URL:
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18

Response:

Success (200):