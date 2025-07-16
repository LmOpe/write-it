/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with title, contents.
 *     tags:
 *       - Posts
 *     security:
 *        - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *             required:
 *               - title
 *               - content
 *               - published  
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     published:
 *                       type: boolean
 *                     slug:
 *                       type: string
 *                     createdAt:
 *                       type: date
 *                     updatedAt:
 *                       type: date
 *                          
 *             example:
 *               message: Post created successfully
 *               post:
 *                 id: "12345"
 *                 title: "My First Post"
 *                 content: "This is the content of my first post."
 *                 published: true
 *                 slug: "my-first-post-12345"
 *                 createdAt: "2023-10-01T12:00:00Z"
 *                 updatedAt: "2023-10-01T12:00:00Z"
 *
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
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a paginated list of all posts with their authors.
 *     tags:
 *       - Posts
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
 *                       author:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           username:
 *                             type: string
 *                           email:
 *                             type: string
 *                         required:
 *                           - id
 *                           - username
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
 *                   author:
 *                     id: "user1"
 *                     username: "johndoe"
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
 * /api/posts/{slug}:
 *   patch:
 *     summary: Update post details
 *     description: Update the title, content, or published status of an existing post by its slug.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *             example:
 *               title: "Updated Post Title"
 *               content: "Updated content of the post."
 *               published: true
 *     responses:
 *       '200':
 *         description: Post detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     published:
 *                       type: boolean
 *                     slug:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time

 *             example:
 *               message: Post detail updated successfully
 *               post:
 *                 id: "12345"
 *                 title: "Updated Post Title"
 *                 content: "Updated content of the post."
 *                 published: true
 *                 slug: "updated-post-title-12345"
 *                 createdAt: "2023-10-01T12:00:00Z"
 *                 updatedAt: "2023-10-02T09:30:00Z"
 *                 author:

 *       '400':
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: At least one field must be provided
 * 
 *       '401':
 *         description: Unauthorized - Missing or invalid token
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
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Post not found
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
 * /api/posts/{slug}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete a post by its slug. Only the post author can perform this action.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to delete.
 *     responses:
 *       '204':
 *         description: Post deleted successfully (No Content)
 *       '401':
 *         description: Unauthorized - Missing or invalid token
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
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Post not found
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