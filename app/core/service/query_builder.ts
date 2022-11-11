import PaginationOption from "../model/pagination_option";
import QueryBuilderOption from "../model/query_builder_option";

class QueryBuilder {
  private table: string;
  private field?: string[];
  private join?: string[];
  private where?: string[];
  private group?: string;
  private having?: string;
  private sort?: string[];
  private paging?: PaginationOption;

  constructor(option: QueryBuilderOption) {
    this.table = option.table;
  }

  public get query(): string {
    let query = `select ${
      this.field == undefined ? "*" : this.field.join(",")
    } from ${this.table}`;

    if (this.join != undefined) {
      query += ` ${this.join?.join(" ")}`;
    }

    if (this.where != undefined) {
      if (this.where.length > 0) {
        let newWhere: string[] = [];

        this.where.forEach((e, i) => {
          if (i == 0) {
            newWhere = [...newWhere, "where"];
          }

          if (i > 0) {
            newWhere = [...newWhere, "and"];
          }

          newWhere = [...newWhere, e];
        });

        this.where = newWhere;
      }

      query += ` ${this.where?.join(" ")}`;
    }

    if (this.group != undefined) {
      query += ` group by ${this.group}`;
    }

    if (this.having != undefined) {
      query += ` having ${this.having}`;
    }

    if (this.sort != undefined) {
      query += ` order by ${this.sort.join(",")}`;
    }

    if (this.paging != undefined) {
      let offset: number = 0;

      if (this.paging.currentPage != undefined) {
        if (this.paging.currentPage > 0) {
          offset = (this.paging.currentPage - 1) * this.paging.perPage;

          query += ` limit ${this.paging.perPage} offset ${offset}`;
        }
      }
    }

    return query;
  }

  public set fields(field: string[]) {
    this.field = this.field == undefined ? field : field.concat(this.field);
  }

  public set joins(join: string[]) {
    this.join = this.join == undefined ? join : join.concat(this.join);
  }

  public set wheres(where: string[]) {
    this.where = this.where == undefined ? where : where.concat(this.where);
  }

  public set groups(group: string) {
    this.group = group;
  }

  public set havings(having: string) {
    this.having = having;
  }

  public set sorts(sort: string[]) {
    this.sort = this.sort == undefined ? sort : sort.concat(this.sort);
  }

  public set pagings(paging: PaginationOption) {
    this.paging = paging;
  }
}

export default QueryBuilder;
