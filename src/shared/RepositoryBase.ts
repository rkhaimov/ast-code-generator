import { DefaultDataSource, IDataSource } from './DefaultDataSource';

let defaultSource: IDataSource = new DefaultDataSource();

export class RepositoryBase {
    public source: IDataSource = defaultSource;
}

export const configureSource = (source: IDataSource) => {
    defaultSource = source;
};
