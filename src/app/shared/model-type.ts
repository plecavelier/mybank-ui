export interface ModelType<T> {

  factory(): T;

  attributes(): {key: string, type: string, model?: any}[];
}