type Fn<T> = (value: T) => void;

export function tap<T>(fn: Fn<T>) {
  return (value: T) => (fn(value), value);
}
