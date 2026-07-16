// From (Roger, 2023).
export type Result<T, E extends BaseError = BaseError> =
  | { success: true; result: T }
  | { success: false; error: E };

// from Roger (2023)
type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

// From (Roger, 2023).
export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  );
  return error;
}

// from Roger (2023)
export class BaseError extends Error {
  public readonly context?: Jsonable;
  constructor(
    message: string = "Error",
    options: { cause?: Error; context?: Jsonable } = {},
  ) {
    const { cause, context } = options;
    super(message, { cause });
    this.name = this.constructor.name;
    this.context = context;
  }
}

export class ApiError extends BaseError {
  constructor(
    message: string = "API Error",
    options: { cause?: Error; context?: Jsonable },
  ) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

/* REFERENCES
 *
 * Roger, Marvin. 2023. The 5 commandments of clean error handling in TypeScript. https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5. Accessed: 2026-07-15.
 */
