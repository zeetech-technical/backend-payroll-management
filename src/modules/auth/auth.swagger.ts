/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                 - type: object
 *                   properties:
 *                     requires2FA:
 *                       type: boolean
 *                       example: true
 *                     tempToken:
 *                       type: string
 */
