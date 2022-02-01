import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { CreateProblemUseCase } from "./CreateProblemUseCase";
import { DeleteProblemUseCase } from "./DeleteProblemUseCase";
import { GetProblemUseCase } from "./GetProblemUseCase";
import { ListProblemsUseCase } from "./ListProblemsUseCase";
import { UpdateProblemsUseCase } from "./UpdateProblemUseCase";

class ProblemController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listProblemsUseCase = container.resolve(ListProblemsUseCase);

    const { c_id } = request.params;

    try {
      const all = await listProblemsUseCase.execute(parseInt(c_id, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getProblemUseCase = container.resolve(GetProblemUseCase);
    const { id_problem } = request.params;

    try {
      const problem = await getProblemUseCase.execute({
        id: parseInt(id_problem, 10),
      });
      return response.json(problem);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createProblemUseCase = container.resolve(CreateProblemUseCase);

    const { id_c } = request.params;

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
      updatetime,
    } = request.body;

    try {
      await createProblemUseCase.execute({
        contestnumber: parseInt(id_c, 10),
        problemname,
        problemfullname,
        problembasefilename,
        probleminputfilename,
        probleminputfile,
        probleminputfilehash,
        fake,
        problemcolorname,
        problemcolor,
        updatetime,
      });

      return response.status(201).send();
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateProblemUseCase = container.resolve(UpdateProblemsUseCase);

    const { id_problem } = request.params;

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
      updatetime,
    } = request.body;

    try {
      await updateProblemUseCase.execute({
        problemnumber: parseInt(id_problem, 10),
        problemname,
        problemfullname,
        problembasefilename,
        probleminputfilename,
        probleminputfile,
        probleminputfilehash,
        fake,
        problemcolorname,
        problemcolor,
        updatetime,
      });

      return response.status(201).send();
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_problem } = request.params;
    const idNumber = parseInt(id_problem, 10);
    const deleteProblemUseCase = container.resolve(DeleteProblemUseCase);

    try {
      await deleteProblemUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Problem deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ProblemController };
