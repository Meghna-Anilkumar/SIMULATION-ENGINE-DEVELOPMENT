export abstract class BaseRepository<T> {
  protected data: T[] = []; 

  async findAll(): Promise<T[]> { return this.data; }
  async save(item: T): Promise<T> {
    this.data.push(item);
    return item;
  }

}