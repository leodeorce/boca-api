import { Contest } from "../entities/Contest";

interface ICreateContestDTO {
  contestnumber: number;
  contestname: string;
  conteststartdate: number;
  contestduration: number;
  contestlastmileanswer?: number;
  contestlastmilescore?: number;
  contestlocalsite: number;
  contestpenalty: number;
  contestmaxfilesize: number;
  contestactive: boolean;
  contestmainsite: number;
  contestkeys: string;
  contestunlockkey: string;
  contestmainsiteurl: string;
}

interface IUpdateContestDTO {
  contestnumber: number;
  contestname?: string;
  conteststartdate?: number;
  contestduration?: number;
  contestlastmileanswer?: number;
  contestlastmilescore?: number;
  contestlocalsite?: number;
  contestpenalty?: number;
  contestmaxfilesize?: number;
  contestactive?: boolean;
  contestmainsite?: number;
  contestkeys?: string;
  contestunlockkey?: string;
  contestmainsiteurl?: string;
}

interface ICountResult {
  count: number;
}

interface IContestRepository {
  findByName(name: string): Promise<Contest | undefined>;
  list(): Promise<Contest[]>;
  create(contest: ICreateContestDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Contest | undefined>;
  update(contest: ICreateContestDTO): Promise<Contest>;
  delete(contestnumber: number): Promise<void>;
}

export {
  IContestRepository,
  ICreateContestDTO,
  ICountResult,
  IUpdateContestDTO,
};
