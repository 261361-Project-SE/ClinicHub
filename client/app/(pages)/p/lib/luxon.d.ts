declare module "luxon";

declare module "luxon" {
  export interface DateTime {
    toISOString(): string;
  }
}
