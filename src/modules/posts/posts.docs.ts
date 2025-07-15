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