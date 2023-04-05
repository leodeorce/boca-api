import { Router } from "express";

import { AuthController } from "../useCases/Auth/AuthController";

const authRoutes = Router();

const authController = new AuthController();

/**
 * @swagger
 * /api/token:
 *   get:
 *     summary: Resgata um token de autenticação.
 *     requestBody:
 *       $ref: '#/components/requestBodies/GetToken'
 *     responses:
 *       200:
 *         description: Token de autenticação.
 *         content:
 *           application/json:
 *             schema:
*                $ref: '#/components/schemas/Token'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Algum recurso não foi encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               FakeContestNotFound:
 *                 summary: Fake Contest não foi encontrado.
 *                 value:
 *                   error: NotFoundError
 *                   message: Fake contest not found
 *               SystemUserNotFound:
 *                 summary: User 'system' não encontrado.
 *                 value:
 *                   error: NotFoundError
 *                   message: User "system" not found
 *               ActiveContestNotFound:
 *                 summary: Não há competições ativas.
 *                 value:
 *                   error: NotFoundError
 *                   message: There is no active contest
 *               UserNotFound:
 *                 summary: Usuário especificado não existe no site ativo da competição ativa.
 *                 value:
 *                   error: NotFoundError
 *                   message: User with username <name> does not exist in the active contest and site
 *       409:
 *         description: Algum recurso não foi encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               FakeSiteNotFound:
 *                 summary: Fake Site não encontrado.
 *                 value:
 *                   error: InconsistencyError
 *                   message: Fake site not found
 *               LocalSiteNotFound:
 *                 summary: Site local especificado pela competição ativa não encontrado.
 *                 value:
 *                   error: InconsistencyError
 *                   message: Local site of ID <id_s> specified by contest <name> of ID <id_c> was not found
 *       500:
 *         description: Erro de configuração da API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               SaltNotConfigured:
 *                 summary: Salt para senhas não está configurado.
 *                 value:
 *                   error: InternalError
 *                   message: 'Cannot generate new authentication token: Password salt is not set'
 *               PrivateKeyNotConfigured:
 *                 summary: Chave privada do par de chaves RSA não está configurada na API.
 *                 value:
 *                   error: InternalError
 *                   message: 'Cannot generate new authentication token: Private key not found'
 */
authRoutes.get("/token", authController.getToken);

export { authRoutes };
