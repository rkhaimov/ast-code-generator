interface IHashMap<THashType = string | number> {
  [key: string]: THashType;
}

interface IRepositoryBase {
  get(url: string): Promise<unknown>;
  post(url: string, body: unknown): Promise<unknown>;
  put(url: string, body: unknown): Promise<unknown>;
  delete(url: string): Promise<unknown>;
  fillPath(url: string, payload: IHashMap): string;
  toQuery(payload: IHashMap): string;
  pick(payload: IHashMap, keys: string[]): IHashMap;
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

  fillPath(url: string, payload: IHashMap): string {
    return Object.keys(payload).reduce<string>((acc, name) => {
      return acc.replace(`{${name}}`, payload[name] as string);
    }, url);
  }

  pick(payload: IHashMap, keys: string[]): IHashMap {
    return keys.reduce<IHashMap>((acc, key) => {
      return { ...acc, [key]: payload[key] };
    }, {});
  }

  toQuery(payload: IHashMap): string {
    const query = Object.keys(payload).reduce<string>((acc, key) => {
      return `${acc}&${key}=${encodeURIComponent(`${payload[key]}`)}`;
    }, '?');

    if (query.length === 1) {
      return '';
    }

    return query;
  }

  protected send(url: string, method: string, data?: unknown): Promise<unknown> {
    return fetch(url, {
      method,
      credentials: 'include',
      body: data && JSON.stringify(data),
    });
  }
}
