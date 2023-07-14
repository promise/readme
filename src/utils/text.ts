// eslint-disable-next-line i/prefer-default-export -- multiple exports can be defined in this file
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
