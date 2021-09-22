import { HttpProgressState } from './HttpProgressState.enum';

export interface IHttpState {
    url: string;
    state: HttpProgressState;
    requestingCount: number;
}