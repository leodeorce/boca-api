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

@Entity("sitetable")
class Site {
  @PrimaryColumn("int4")
  @IsInt()
  @IsPositive({ message: "contestnumber must be greater than zero" })
  contestnumber!: number;

  @PrimaryColumn("int4")
  @IsInt()
  @IsPositive({ message: "sitenumber must be greater than zero" })
  sitenumber!: number;

  @Column("varchar", { length: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  siteip!: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  sitename!: string;

  @Column("bool")
  @IsBoolean()
  siteactive!: boolean;

  @Column("bool")
  @IsBoolean()
  sitepermitlogins!: boolean;

  @Column("int4", { nullable: true })
  @IsInt()
  @Min(0)
  sitelastmileanswer?: number;

  @Column("int4", { nullable: true })
  @IsInt()
  @Min(0)
  sitelastmilescore?: number;

  @Column("int4", { nullable: true })
  @IsInt()
  @IsPositive({ message: "siteduration must be greater than zero" })
  siteduration?: number;

  @Column("bool", { nullable: true })
  @IsBoolean()
  siteautoend?: boolean;

  @Column("text", { nullable: true })
  @IsString()
  sitejudging?: string;

  @Column("text", { nullable: true })
  @IsString()
  sitetasking?: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  siteglobalscore = "";

  @Column("int4")
  @IsInt()
  @Min(0)
  sitescorelevel = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextuser = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextclar = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextrun = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenexttask = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxtask = 8;

  @Column("varchar", { length: 20 })
  @IsString()
  @MinLength(0)
  @MaxLength(20)
  sitechiefname!: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  @Column("bool")
  @IsBoolean()
  siteautojudge = false;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxruntime = 600;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxjudgewaittime = 900;
}

const createRequiredProperties = [
  "siteip",
  "sitename",
  "siteactive",
  "sitepermitlogins",
  "siteglobalscore",
  "sitescorelevel",
  "sitenextuser",
  "sitenextclar",
  "sitenextrun",
  "sitenexttask",
  "sitemaxtask",
  "sitechiefname",
  "siteautojudge",
  "sitemaxruntime",
  "sitemaxjudgewaittime",
];

const updateRequiredProperties = [
  "siteip",
  "sitename",
  "siteactive",
  "sitepermitlogins",
  "siteglobalscore",
  "sitescorelevel",
  "sitenextuser",
  "sitenextclar",
  "sitenextrun",
  "sitenexttask",
  "sitemaxtask",
  "sitechiefname",
  "siteautojudge",
  "sitemaxruntime",
  "sitemaxjudgewaittime",
];

const siteRequestSchema = {
  type: "object",
  properties: {
    contestnumber: {
      type: "number",
      description: "Identificador da competição.",
      minimum: 0,
    },
    sitenumber: {
      type: "number",
      description: "Identificador do site.",
      minimum: 0,
    },
    siteip: {
      type: "string",
      description: "IP público do servidor do site.",
      minLength: 1,
      maxLength: 200,
    },
    sitename: {
      type: "string",
      description: "Nome do site.",
      minLength: 1,
      maxLength: 50,
    },
    siteactive: {
      type: "boolean",
      description: "Indica se o site está ativo ou não.",
    },
    sitepermitlogins: {
      type: "boolean",
      description: "Indica se logins são aceitos ou não.",
    },
    sitelastmileanswer: {
      type: "number",
      description: "Tempo corrido em segundos a partir do início para que o site pare de responder aos times.",
      minimum: 0,
    },
    sitelastmilescore: {
      type: "number",
      description: "Tempo corrido em segundos a partir do início para que o placar neste site seja congelado.",
      minimum: 0,
    },
    siteduration: {
      type: "number",
      description: "Duração da competição em segundos.",
      minimum: 1,
    },
    siteautoend: {
      type: "boolean",
      description: "",  // TODO Verificar se existe documentação
    },
    sitejudging: {
      type: "string",
      description: "Indica quais sites são julgados neste site.",
    },
    sitetasking: {
      type: "string",
      description: "Indica quais sites terão suas tasks processadas neste site.",
    },
    siteglobalscore: {
      type: "string",
      description: "Indica se este site deve mostrar placar global.",
      minLength: 0,
      maxLength: 50,
    },
    sitescorelevel: {
      type: "number",
      description: "Indica o nível de detalhes do placar exibido aos times.",
      minimum: 0,
    },
    sitenextuser: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
    sitenextclar: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
    sitenextrun: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
    sitenexttask: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
    sitemaxtask: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
    sitechiefname: {
      type: "string",
      description: "Nome de usuário do juiz chefe, caso exista.",
      minLength: 0,
      maxLength: 20,
    },
    siteautojudge: {
      type: "boolean",
      description: "",  // TODO Verificar se existe documentação
    },
    sitemaxtaskruntime: {
      type: "number",
      description: "",
      minimum: 0,
    },
    sitemaxjudgewaittime: {
      type: "number",
      description: "",  // TODO Verificar se existe documentação
      minimum: 0,
    },
  },
};

const siteResponseSchema = {
  ...siteRequestSchema,
  properties: {
    ...siteRequestSchema.properties,
    updatetime: {
      type: "number",
      description:
        "Unix timestamp da última atualização desta instância no banco de dados.",
      minimum: 1,
    },
  },
};

const createSiteSchema = {
  ...siteRequestSchema,
  required: createRequiredProperties,
};

const updateSiteSchema = {
  ...siteRequestSchema,
  required: updateRequiredProperties,
};

const createSiteRequest = {
  required: true,
  content: {
    "application/json": {
      schema: createSiteSchema,
    },
  },
};

const updateSiteRequest = {
  required: true,
  content: {
    "application/json": {
      schema: updateSiteSchema,
    },
  },
};

export {
  Site,
  siteResponseSchema,
  createRequiredProperties,
  updateRequiredProperties,
  createSiteRequest,
  updateSiteRequest,
};
