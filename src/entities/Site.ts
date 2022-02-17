import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("sitetable")
class Site {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  sitenumber!: number;

  @Column()
  siteip!: string;

  @Column()
  sitename!: string;

  @Column()
  siteactive!: boolean;

  @Column()
  sitepermitlogins!: boolean;

  @Column()
  sitelastmileanswer?: boolean;

  @Column()
  sitelastmilescore?: number;

  @Column()
  siteduration?: number;

  @Column()
  siteautoend?: boolean;

  @Column()
  sitejudging?: string;

  @Column()
  sitetasking?: string;

  @Column()
  siteglobalscore!: string;

  @Column()
  sitescorelevel!: number;

  @Column()
  sitenextuser!: number;

  @Column()
  sitenextclar!: number;

  @Column()
  sitenextrun!: number;

  @Column()
  sitemaxtask!: number;

  @Column()
  sitechiefname!: string;

  @UpdateDateColumn()
  updatetime!: number;

  @Column()
  siteautojudge: boolean = false;

  @Column()
  sitemaxruntime!: number;

  @Column()
  sitemaxjudgewaittime!: number;
}

export { Site };
