interface IRepositoryBase {
  get(url: string): Promise<unknown>;
  post(url: string, body: unknown): Promise<unknown>;
  put(url: string, body: unknown): Promise<unknown>;
  delete(url: string): Promise<unknown>;
  fillPath(url: string, payload: object): string;
  toQuery(payload: object): string;
  pick(payload: object, keys: string[]): object;
}

class RepositoryBase implements IRepositoryBase {
  get(url: string): Promise<unknown> {
    return this.send(url, 'GET');
  }

  delete(url: string): Promise<unknown> {
    return this.send(url, 'DELETE');
  }

  post(url: string, body: unknown): Promise<unknown> {
    return this.send(url, 'POST', body);
  }

  put(url: string, body: unknown): Promise<unknown> {
    return this.send(url, 'PUT', body);
  }

  fillPath(url: string, payload: object): string {
    return '';
  }

  pick(payload: object, keys: string[]): object {
    return payload;
  }

  toQuery(payload: object): string {
    return '';
  }

  protected send(url: string, method: string, data?: unknown): Promise<unknown> {
    return fetch(url, {
      method,
      credentials: 'include',
      body: data && JSON.stringify(data),
    });
  }
}
