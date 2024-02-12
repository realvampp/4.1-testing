export class PaginatedResultDto<T> {
  constructor(
    public count: number,
    public next: string | null,
    public prev: string | null,
    public data: T
  ) {}
}