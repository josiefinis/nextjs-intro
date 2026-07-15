export function replaceHtmlEntities(text: string) {
  return text.replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
}

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

/* REFERENCES
 *
 * Roger, Marvin. 2023. The 5 commandments of clean error handling in TypeScript. https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5. Accessed: 2026-07-15.
 */
