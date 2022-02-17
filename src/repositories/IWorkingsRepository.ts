import { Working } from "../entities/Working";

interface ICreateWorkingDTO {
  contestnumber: number;
  name: string;
  start_date?: number;
  end_date?: number;
  last_answer_date?: number;
  max_file_size?: number;
  is_multilogin?: boolean;
  deleted_at?: number;
}

interface IUpdateWorkingDTO {
  contestnumber?: number;
  workingnumber: number;
  name?: string;
  start_date?: number;
  end_date?: number;
  last_answer_date?: number;
  max_file_size?: number;
  is_multilogin?: boolean;
  deleted_at?: number;
}

interface ICountResult {
  max: string;
}

interface IWorkingsRepository {
  findByName(name: string): Promise<Working | undefined>;
  list(contestNumber?: number): Promise<Working[]>;
  create(working: ICreateWorkingDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Working | undefined>;
  update(working: IUpdateWorkingDTO): Promise<Working>;
  delete(workingNumber: number): Promise<void>;
}

export {
  IWorkingsRepository,
  ICreateWorkingDTO,
  ICountResult,
  IUpdateWorkingDTO,
};
