import type { Team } from "@prisma/client";
import type { Filter } from "./App";

export type State<T> = [T, (val: T) => void];

export const keys = <T extends Record<any, any>>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

export const entries = <T extends Record<any, any>>(obj: T) => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

export const capitalize = (val: string) => {
  return val.slice(0, 1).toUpperCase() + val.slice(1);
};

export const filterNull = <T>(array: (T | null)[]) => {
  return array.filter((val) => val != null) as T[];
};

export const applyFilters = (teams: Team[], filters: Filter[]) => {
  return teams.filter((team) => {
    return filters.reduce((prev, curr) => prev && curr.apply(team), true);
  });
};
