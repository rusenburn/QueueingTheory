export class CaseSummary {
    public meanArrivalRate: number;
    public meanServiceRate: number;
    public numberOfServers: number;
    public utilizationFactor: number;
    public systemLength: number;
    public queueLength: number;
    public systemWaitingTime: number;
    public queueWaitingTime: number;
    public probabilityOf0Customers: number;
    public probabilities: number[];
}
