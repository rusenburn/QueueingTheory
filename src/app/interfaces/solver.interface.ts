import { CaseSummary } from '../models/caseSummary.model';
import { IDataEntryProvider } from './dataEntryProvider.interface';

export interface ISolver {
    solve(provider: IDataEntryProvider, servers: number): CaseSummary;
}
