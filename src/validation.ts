// Rules get whatever value the control in the Field holds
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rule = (value: any) => true | string;

const isEmpty = (value: unknown) =>
  value === null ||
  value === undefined ||
  value === '' ||
  value === false ||
  (Array.isArray(value) && value.length === 0);

export const required =
  (message = 'Required'): Rule =>
  (value) =>
    !isEmpty(value) || message;

export const min =
  (limit: number, message = `Must be at least ${limit}`): Rule =>
  (value) =>
    isEmpty(value) || Number(value) >= limit || message;

export const max =
  (limit: number, message = `Must be at most ${limit}`): Rule =>
  (value) =>
    isEmpty(value) || Number(value) <= limit || message;

export const minLength =
  (length: number, message = `Must be at least ${length} characters`): Rule =>
  (value) =>
    isEmpty(value) || String(value).length >= length || message;

export const maxLength =
  (length: number, message = `Must be at most ${length} characters`): Rule =>
  (value) =>
    isEmpty(value) || String(value).length <= length || message;

export const pattern =
  (regex: RegExp, message = 'Invalid format'): Rule =>
  (value) =>
    isEmpty(value) || regex.test(String(value)) || message;
