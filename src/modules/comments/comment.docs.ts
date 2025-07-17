/**
 * @openapi
 * /api/posts/{slug}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a great post!
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment added successfully.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cmt_1234567890"
 *                     content:
 *                       type: string
 *                       example: "This is a great post!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-15T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-15T12:34:56.789Z"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
 *       400:
 *         description: Bad request (e.g., missing content)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Content is required
 */


/**
 * @openapi
 * /api/comments/{id}/reply:
 *   post:
 *     summary: Add reply to a comment
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the comment to reply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Thank you!
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Comment Responded to successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment Responded to successfully.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "rpl_1234567890"
 *                     content:
 *                       type: string
 *                       example: "Thank you"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-15T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-15T12:34:56.789Z"
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment not found
 *       400:
 *         description: Bad request (e.g., missing content)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Content is required
 */

/**
 * @openapi
 * /api/comments/{id}:
 *   patch:
 *     summary: Edit an existing comment
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment content here.
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Comment edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment edited successfully.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cmt_123456"
 *                     content:
 *                       type: string
 *                       example: "Updated comment content here."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-14T10:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-15T12:30:00.000Z"
 *                     authorId:
 *                       type: string
 *                       example: "user_abc123"
 *                     postId:
 *                       type: string
 *                       example: "post_xyz456"
 *       400:
 *         description: Bad request (e.g., missing content)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Content is required
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment not found
 */

/**
 * @openapi
 * /api/posts/{slug}/comments:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post to retrieve comments for
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
 *         description: Number of comments per page (default is 10)
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comments fetched successfully
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "7e23ff0f-25af-4247-9aba-aac11cdde0d7"
 *                       content:
 *                         type: string
 *                         example: "This is an awesome post!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-17T11:10:37.895Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-17T11:11:23.661Z"
 *                       authorId:
 *                         type: string
 *                         example: "f7d0e6ef-8996-474f-9396-c3ffd92345f3"
 *                       postId:
 *                         type: string
 *                         example: "994e1de2-93f3-4df5-909c-b481b8ef3beb"
 *                 totalComments:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
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
 *               message: Post with the given slug does not exist!
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
 * /api/comments/{id}/responses:
 *   get:
 *     summary: Get all responses/comments for a specific comment
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the comment to retrieve responses for
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
 *         description: Number of comments per page (default is 10)
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comments fetched successfully
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "7e23ff0f-25af-4247-9aba-aac11cdde0d7"
 *                       content:
 *                         type: string
 *                         example: "This is an awesome post!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-17T11:10:37.895Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-17T11:11:23.661Z"
 *                       authorId:
 *                         type: string
 *                         example: "f7d0e6ef-8996-474f-9396-c3ffd92345f3"
 *                       postId:
 *                         type: string
 *                         example: "994e1de2-93f3-4df5-909c-b481b8ef3beb"
 *                 totalComments:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
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
 *               message: Post with the given Id does not exist!
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
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete a Comment by its id. Only the Comment author can perform this action.
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the Comment to delete.
 *     responses:
 *       '204':
 *         description: Comment deleted successfully (No Content)
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
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Comment not found
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