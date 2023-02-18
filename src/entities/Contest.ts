import { Column, Entity, PrimaryColumn } from "typeorm";
import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

import { IsType } from "../shared/validation/utils/IsType";

@Entity("contesttable")
class Contest {
  @PrimaryColumn("int4")
  @Min(0)
  @IsInt()
  contestnumber!: number;

  @Column("varchar", { length: 100 })
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  contestname!: string;

  @Column("int4")
  @IsPositive({ message: "conteststartdate must be greater than zero" })
  @IsInt()
  conteststartdate!: number;

  @Column("int4")
  @IsPositive({ message: "contestduration must be greater than zero" })
  @IsInt()
  contestduration!: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  contestlastmileanswer: number | undefined;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  contestlastmilescore: number | undefined;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestlocalsite must be greater than zero" })
  contestlocalsite!: number;

  @Column("int4")
  @IsInt()
  @Min(0)
  contestpenalty!: number;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestmaxfilesize must be greater than zero" })
  contestmaxfilesize!: number;

  @Column("bool")
  @IsBoolean()
  contestactive!: boolean;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestmainsite must be greater than zero" })
  contestmainsite!: number;

  @Column("text")
  @IsString()
  @MinLength(0)
  contestkeys!: string;

  @Column("varchar", { length: 100 })
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  contestunlockkey!: string;

  @Column("varchar", { length: 200 })
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  contestmainsiteurl!: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  constructor(
    contestnumber: number,
    contestname: string,
    conteststartdate: number,
    contestduration: number,
    contestlastmileanswer: number | undefined = undefined,
    contestlastmilescore: number | undefined = undefined,
    contestlocalsite: number,
    contestpenalty: number,
    contestmaxfilesize: number,
    contestactive: boolean,
    contestmainsite: number,
    contestkeys: string,
    contestunlockkey: string,
    contestmainsiteurl: string
  ) {
    this.contestnumber = contestnumber;
    this.contestname = contestname;
    this.conteststartdate = conteststartdate;
    this.contestduration = contestduration;
    this.contestlastmileanswer = contestlastmileanswer;
    this.contestlastmilescore = contestlastmilescore;
    this.contestlocalsite = contestlocalsite;
    this.contestpenalty = contestpenalty;
    this.contestmaxfilesize = contestmaxfilesize;
    this.contestactive = contestactive;
    this.contestmainsite = contestmainsite;
    this.contestkeys = contestkeys;
    this.contestunlockkey = contestunlockkey;
    this.contestmainsiteurl = contestmainsiteurl;
  }
}

const createRequiredProperties = [
  "contestname",
  "conteststartdate",
  "contestduration",
  "contestlocalsite",
  "contestpenalty",
  "contestmaxfilesize",
  "contestactive",
  "contestmainsite",
  "contestkeys",
  "contestunlockkey",
  "contestmainsiteurl",
];

const updateRequiredProperties = [
  "contestname",
  "conteststartdate",
  "contestduration",
  "contestlocalsite",
  "contestpenalty",
  "contestmaxfilesize",
  "contestactive",
  "contestmainsite",
  "contestkeys",
  "contestunlockkey",
  "contestmainsiteurl",
];

const contestRequestSchema = {
  type: "object",
  properties: {
    contestname: {
      type: "string",
      description: "Nome da competição.",
      minLength: 1,
      maxLength: 100,
    },
    conteststartdate: {
      type: "number",
      description: "Unix timestamp da data de início da competição.",
      minimum: 1,
    },
    contestduration: {
      type: "number",
      description: "Tempo de duração da competição em segundos.",
      minimum: 1,
    },
    contestlastmileanswer: {
      type: "number",
      description:
        "Quantidade de tempo em segundos a partir do início para não responder aos times.",
      minimum: 0,
    },
    contestlastmilescore: {
      type: "number",
      description:
        "Quantidade de tempo em segundos a partir do início para não atualizar placar.",
      minimum: 0,
    },
    contestlocalsite: {
      type: "number",
      description:
        "Identificador do site local do servidor no qual se encontra a competição.",
      minimum: 1,
    },
    contestpenalty: {
      type: "number",
      description:
        "Quantidade de segundos perdidos para cada submissão incorreta.",
      minimum: 0,
    },
    contestmaxfilesize: {
      type: "number",
      description:
        "Tamanho máximo em bytes dos códigos que podem ser submetidos.",
      minimum: 1,
    },
    contestactive: {
      type: "boolean",
      description: "Indica se a competição está ativa ou não.",
    },
    contestmainsite: {
      type: "number",
      description:
        "Identificador do site principal no qual se encontra a competição.",
      minimum: 1,
    },
    contestkeys: {
      type: "string",
      description: "Lista de chaves relevantes à competição.",
    },
    contestunlockkey: {
      type: "string",
      description: "Chave para descriptografar arquivos de problemas.",
      minLength: 0,
      maxLength: 100,
    },
    contestmainsiteurl: {
      type: "string",
      description: "URL do site principal no qual se encontra a competição.",
      minLength: 0,
      maxLength: 200,
    },
  },
};

const contestResponseSchema = {
  ...contestRequestSchema,
  properties: {
    ...contestRequestSchema.properties,
    contestnumber: {
      type: "number",
      description: "Identificador da competição.",
      minimum: 0,
    },
    updatetime: {
      type: "number",
      description:
        "Unix timestamp da última atualização desta instância no banco de dados.",
      minimum: 1,
    },
  },
};

const createContestSchema = {
  ...contestRequestSchema,
  required: createRequiredProperties,
};

const updateContestSchema = {
  ...contestRequestSchema,
  required: updateRequiredProperties,
};

const createContestRequest = {
  required: true,
  content: {
    "application/json": {
      schema: createContestSchema,
    },
  },
};

const updateContestRequest = {
  required: true,
  content: {
    "application/json": {
      schema: updateContestSchema,
    },
  },
};

export {
  Contest,
  contestResponseSchema,
  createRequiredProperties,
  updateRequiredProperties,
  createContestRequest,
  updateContestRequest,
};
