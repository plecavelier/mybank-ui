export interface ModelType<T> {

  factory(): T;

  attributes(): Map<string, any>;
}