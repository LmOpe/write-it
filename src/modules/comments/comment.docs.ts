/**
 * @openapi
 * /api/comments/posts/{slug}:
 *   post:
 *     summary: Add a comment to a post
 *     tags:
 *       - Comment
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
