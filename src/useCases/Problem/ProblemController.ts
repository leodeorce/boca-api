import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import "reflect-metadata";
import { container } from "tsyringe";

import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateProblemUseCase } from "./CreateProblemUseCase";
import { DeleteProblemUseCase } from "./DeleteProblemUseCase";
import { GetProblemUseCase } from "./GetProblemUseCase";
import { ListProblemsUseCase } from "./ListProblemsUseCase";
import { UpdateProblemFileUseCase } from "./UpdateProblemFileUseCase";
import { UpdateProblemsUseCase } from "./UpdateProblemUseCase";

class ProblemController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listProblemsUseCase = container.resolve(ListProblemsUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      const all = await listProblemsUseCase.execute({ contestnumber });

      return response.status(HttpStatus.SUCCESS).json(all);
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const getProblemUseCase = container.resolve(GetProblemUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_p } = request.params;
    const contestnumber = Number(id_c);
    const problemnumber = Number(id_p);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isProblemId(problemnumber);

      const problem = await getProblemUseCase.execute({
        contestnumber,
        problemnumber,
      });

      return response.status(HttpStatus.SUCCESS).json(problem);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createProblemUseCase = container.resolve(CreateProblemUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      const probleminputfile = request.files?.probleminputfile as UploadedFile;

      const {
        problemnumber: problemnumberString,
        fake: fakeString,
        problemname,
        problemfullname,
        problembasefilename,
        problemcolorname,
        problemcolor,
      } = request.body;

      const problemnumber = Number(problemnumberString);
      const fake = Boolean(fakeString);

      idValidator.isContestId(contestnumber);
      idValidator.isProblemId(problemnumber);

      const problem = await createProblemUseCase.execute({
        contestnumber,
        problemnumber,
        problemname,
        problemfullname,
        problembasefilename,
        probleminputfile,
        fake,
        problemcolorname,
        problemcolor,
      });

      return response.status(HttpStatus.CREATED).json(problem);
    } catch (error) {
      next(error);
    }
  }

  async updateFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateProblemFileUseCase = container.resolve(UpdateProblemFileUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_p } = request.params;
    const contestnumber = Number(id_c);
    const problemnumber = Number(id_p);

    try {
      const probleminputfile = request.files?.probleminputfile as UploadedFile;

      idValidator.isContestId(contestnumber);
      idValidator.isProblemId(problemnumber);

      const problem = await updateProblemFileUseCase.execute({
        contestnumber,
        problemnumber,
        probleminputfile,
      });

      return response.status(HttpStatus.UPDATED).json(problem);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateProblemUseCase = container.resolve(UpdateProblemsUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_p } = request.params;
    const contestnumber = Number(id_c);
    const problemnumber = Number(id_p);

    const {
      problemname,
      problemfullname,
      problembasefilename,
      probleminputfilename,
      probleminputfile,
      probleminputfilehash,
      fake,
      problemcolorname,
      problemcolor,
    } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isProblemId(problemnumber);

      const updatedProblem = await updateProblemUseCase.execute({
        contestnumber,
        problemnumber,
        problemname,
        problemfullname,
        problembasefilename,
        probleminputfilename,
        probleminputfile,
        probleminputfilehash,
        fake,
        problemcolorname,
        problemcolor,
      });

      return response.status(HttpStatus.UPDATED).json(updatedProblem);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteProblemUseCase = container.resolve(DeleteProblemUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_p } = request.params;
    const contestnumber = Number(id_c);
    const problemnumber = Number(id_p);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isProblemId(problemnumber);

      await deleteProblemUseCase.execute({ contestnumber, problemnumber });

      return response.status(HttpStatus.DELETED).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProblemController };
