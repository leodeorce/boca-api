import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

/**
 * @swagger
 * /api/contest:
 *   get:
 *     tags:
 *       - Contest
 *     summary: Resgata todas as competições cadastradas.
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       200:
 *         description: Competições cadastradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
contestsRoutes.get(
  "/contest",
  authenticate([
    UserType.SYSTEM, // Deve receber todos os Contests
    UserType.ADMIN, // TODO Deve apenas receber o Contest ao qual pertence
    UserType.JUDGE, // TODO Deve apenas receber o Contest ao qual pertence
    UserType.TEAM, // TODO Deve apenas receber o Contest ao qual pertence
  ]),
  contestController.listAll
);

/**
 * @swagger
 * /api/contest/{id_c}:
 *   get:
 *     tags:
 *       - Contest
 *     summary: Resgata a competição de identificador id_c.
 *     parameters:
 *       - $ref: '#/components/parameters/ContestId'
 *       - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       200:
 *         description: A competição cadastrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Competição não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contestsRoutes.get(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Deve receber o Contest solicitado sempre
    UserType.ADMIN, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
    UserType.JUDGE, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
    UserType.TEAM, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
  ]),
  contestController.getOne
);

/**
 * @swagger
 * /api/contest:
 *   post:
 *     tags:
 *       - Contest
 *     summary: Cria uma nova competição.
 *     parameters:
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateContest'
 *     responses:
 *       200:
 *         description: A competição criada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
contestsRoutes.post(
  "/contest",
  authenticate([
    UserType.SYSTEM, // Único capaz de criar um Contest
  ]),
  contestController.create
);


/**
 * @swagger
 * /api/contest/{id_c}:
 *   put:
 *     tags:
 *       - Contest
 *     summary: Atualiza uma competição existente.
 *     parameters:
 *       - $ref: '#/components/parameters/ContestId'
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateContest'
 *     responses:
 *       200:
 *         description: A competição atualizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
contestsRoutes.put(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de editar um Contest // TODO Validar
  ]),
  contestController.update
);

/**
 * @swagger
 * /api/contest/{id_c}:
 *   delete:
 *     tags:
 *       - Contest
 *     summary: Deleta uma competição.
 *     parameters:
 *       - $ref: '#/components/parameters/ContestId'
 *       - $ref: '#/components/parameters/Authorization'
 *     responses:
 *       204:
 *         description: A competição foi deletada.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
contestsRoutes.delete(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de deletar um Contest // TODO Validar
  ]),
  contestController.delete
);

export { contestsRoutes };
