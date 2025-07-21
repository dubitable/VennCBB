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

export const nameMap: Partial<Record<keyof Team, string>> = {
  logos: "Logo",
  Short_Conference_Name: "Conf.",
  Full_Team_Name: "Team",
  Net_Rating: "NTG",
  Adjusted_Offensive_Efficiency: "AdjOE",
  Adjusted_Defensive_Efficiency: "AdjDE",
  Raw_Offensive_Efficiency: "OE",
  Raw_Defensive_Efficiency: "DE",
  Adjusted_Tempo: "AdjTmp",
  Raw_Tempo: "Tmp",
  eFGPct: "eFG%",
  FG2Pct: "2FG%",
  FG3Pct: "3FG%",
  FTPct: "FT%",
  TOPct: "TO%",
  BlockPct: "Block%",
  OppFG2Pct: "O2FG%",
  OppFG3Pct: "O3FG%",
  OppFTPct: "OFT%",
  OppBlockPct: "OBlock%",
};

export const applyFilters = (teams: Team[], filters: Filter[]) => {
  return teams.filter((team) => {
    return filters.reduce((prev, curr) => prev && curr.apply(team), true);
  });
};
