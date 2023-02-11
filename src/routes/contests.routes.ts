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
 *     summary: Resgata todas as competições cadastradas.
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
 *         description: Requisição não autenticada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *     summary: Resgata a competição de identificador id_c.
 *     parameters:
 *       - name: id_c
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: O identificador da competição.
 *       - name: Authorization
 *         in: header
 *         description: Token de autorização no formato "Token <token_jwt_aqui>" sem os <>.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A competição cadastrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       404:
 *         description: Competição não encontrada.
 *       401:
 *         description: Requisição não autenticada.
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

contestsRoutes.post(
  "/contest",
  authenticate([
    UserType.SYSTEM, // Único capaz de criar um Contest
  ]),
  contestController.create
);

contestsRoutes.put(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de editar um Contest // TODO Validar
  ]),
  contestController.update
);

contestsRoutes.delete(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de deletar um Contest // TODO Validar
  ]),
  contestController.delete
);

export { contestsRoutes };
