/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with username, password, and optional email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 accessToken:
 *                   type: string
 *             example:
 *               message: User created successfully
 *               user:
 *                 id: "123456"
 *                 username: "JDoe"
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Missing required fields
 *       '409':
 *         description: Conflict - Email or Username already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Username already exist
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */


/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Log user in using username and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *             example:
 *               message: User login successful
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Missing required fields
 *       '401':
 *         description: Conflict - Incorrect username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Incorrect username or password
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get logged in user details
 *     description: Get the details of the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                   required:
 *                     - id
 *                     - username
 *             example:
 *               message: User details retrieved successfully
 *               user:
 *                 id: "123456"
 *                 username: "JDoe"
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Log the user out by blacklisting the access token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: User logged out successfully
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */

/**
 * @openapi
 * /api/users/{id}/posts:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieve all posts created by a specific user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose posts are to be retrieved
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Number of posts per page (default is 10)
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       published:
 *                         type: boolean
 *                       slug:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 totalPosts:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *             example:
 *               message: Posts fetched successfully
 *               posts:
 *                 - id: "abc123"
 *                   title: "First Post"
 *                   content: "This is the first post"
 *                   published: true
 *                   slug: "first-post"
 *                   createdAt: "2023-10-01T12:00:00Z"
 *                   updatedAt: "2023-10-01T12:00:00Z"
 *               totalPosts: 25
 *               currentPage: 1
 *               totalPages: 3
 * 
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 * 
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */


/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                     required:
 *                       - id
 *                       - username
 *                       - createdAt
 *                       - updatedAt
 *             example:
 *               message: Users retrieved successfully
 *               users:
 *                 - id: "1a2b3c"
 *                   username: "john_doe"
 *                   email: "john@example.com"
 *                   createdAt: "2023-10-01T12:00:00Z"
 *                   updatedAt: "2023-10-01T12:30:00Z"
 *                 - id: "4d5e6f"
 *                   username: "jane_smith"
 *                   createdAt: "2023-10-02T09:00:00Z"
 *                   updatedAt: "2023-10-02T09:15:00Z"
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */

/**
 * @openapi
 * /api/users:
 *   patch:
 *     summary: Update user details
 *     description: Update the authenticated user's username or email.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               username: "NewUsername"
 *               email: "newemail@example.com"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                        type: date-time
 *                     updatedAt:
 *                        type: date-time
 *                   required:
 *                     - id
 *                     - username
 *                     - createdAt
 *                     - updateAt
 *             example:
 *               message: User updated successfully
 *               user:
 *                 id: "123456"
 *                 username: "NewUsername"
 *                 email: "newemail@example.com"
 *                 createdAt: "2025-07-15T07:28:10.819Z"
 *                 updatedAt: "2025-07-16T03:11:10.819Z"
 *       '400':
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: At least one valid field is required (username or email)
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */

/**
 * @openapi
 * /api/users/posts:
 *   get:
 *     summary: Get all posts for logged in user
 *     description: Retrieve all posts created by the logged in user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Number of posts per page (default is 10)
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       published:
 *                         type: boolean
 *                       slug:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 totalPosts:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *             example:
 *               message: Posts fetched successfully
 *               posts:
 *                 - id: "abc123"
 *                   title: "First Post"
 *                   content: "This is the first post"
 *                   published: true
 *                   slug: "first-post"
 *                   createdAt: "2023-10-01T12:00:00Z"
 *                   updatedAt: "2023-10-01T12:00:00Z"
 *               totalPosts: 25
 *               currentPage: 1
 *               totalPages: 3
 * 
 *       '401':
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid access token
 * 
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Something went wrong. Please try again later.
 */