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

/**
 * @openapi
 * /auth/verify-2fa:
 *   post:
 *     summary: Verificar código 2FA
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tempToken:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - tempToken
 *               - code
 *     responses:
 *       200:
 *         description: Token final
 */