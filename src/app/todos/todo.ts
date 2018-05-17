// A Todo instance
export class Todo {
    id: number;
    title: string;
    complete: boolean;
    category: number;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
