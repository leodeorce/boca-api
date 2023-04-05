import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { SiteController } from "../useCases/Site/SiteController";

const sitesRoutes = Router();

const siteController = new SiteController();

/**
 * @swagger
 * /api/contest/{id_c}/site:
 *   get:
 *     tags:
 *       - Site
 *     summary: Resgata todos os sites cadastrados na competição de identificador id_c.
 *     parameters:
 *       - $ref: '#/components/parameters/ContestId'
 *       - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       200:
 *         description: Sites cadastrados na competição de identificador **id_c**.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
sitesRoutes.get(
  "/contest/:id_c/site",
  authenticate([
    UserType.ADMIN, // TODO Deve apenas receber os Sites para o Contest ao qual pertence
    UserType.SYSTEM, // Deve ser capaz de receber Sites de quaisquer Contests
  ]),
  siteController.listAll
);

sitesRoutes.post(
  "/contest/:id_c/site",
  authenticate([
    UserType.ADMIN, // TODO Deve ser capaz de criar Sites somente no Contest ao qual pertence
    UserType.SYSTEM, // Deve ser capaz de criar Sites para quaisquer Contests
  ]),
  siteController.create
);

/**
 * @swagger
 * /api/contest/{id_c}/site/{id_s}:
 *   get:
 *     tags:
 *       - Site
 *     summary: Resgata o site de identificador id_s pertencente à competição de identificador id_c.
 *     parameters:
 *       - $ref: '#/components/parameters/ContestId'
 *       - $ref: '#/components/parameters/SiteId'
 *       - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       200:
 *         description: O site de identificador **id_s** pertencente à competição de identificador **id_c**.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Site não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
sitesRoutes.get(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve apenas receber um Site do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de receber um Site de qualquer Contest
  ]),
  siteController.getOne
);

sitesRoutes.put(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar somente Sites do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de atualizar Sites de quaisquer Contests
  ]),
  siteController.update
);

sitesRoutes.delete(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve ser capaz de deletar somente Sites do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de deletar Sites de quaisquer Contests
  ]),
  siteController.delete
);

export { sitesRoutes };
