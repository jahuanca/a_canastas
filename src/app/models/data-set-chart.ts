export class DataSetChart {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;

    constructor(init?:Partial<DataSetChart>) {
        Object.assign(this, init);
    }
}
