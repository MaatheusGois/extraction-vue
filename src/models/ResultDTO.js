// ResultDTO.js

export default class ResultDTO {
  constructor({
    title = '',
    year = '',
    authors = '',
    abstract = '',
    url = '',
    DOI = '',
    PDF = '',
    type = '',
    publicated = '',
  } = {}) {
    this.title = title;
    this.year = year;
    this.authors = authors;
    this.abstract = abstract;
    this.url = url;
    this.DOI = DOI;
    this.PDF = PDF;
    this.type = type;
    this.publicated = publicated;
  }
}