type PaginatedResponse = {
  count: number,
  next: string,
  previous: string,
  results: PaginatedResponse[],
}
