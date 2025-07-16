import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

// @ts-ignore
import { VennDiagram as VennDiagramJS, sortAreas } from "../../venn/venn";
import useWindowDimensions from "../hooks";
import type { Team } from "@prisma/client";
import type { Restriction } from "../App";

function powerset<T>(set: T[]) {
  const res: { index: number; value: T }[][] = [];

  for (let i = 1; i < 1 << set.length; i++) {
    const subset: { index: number; value: T }[] = [];

    for (let j = 0; j < set.length; j++) {
      if ((i >> j) & 1) {
        subset.push({ index: j, value: set[j] });
      }
    }
    res.push(subset);
  }

  return res;
}

type Memo<T> = {
  res: T[];
  next: Record<number, Memo<T>>;
};

function createSets(teams: Team[], restrictions: Restriction[]) {
  const memo: Memo<Team> = { res: teams, next: {} };

  const sets = powerset(restrictions).map((subRestrictions) => {
    function applyRestrictions(teams: Team[], current: Memo<Team>, i = 0) {
      if (i == subRestrictions.length) return teams;

      const { value, index } = subRestrictions[i];
      const { max, min, stat } = value;

      const filtered = teams.filter((elem) => {
        const item = elem[stat] as number;
        return min <= item && max >= item;
      });

      current.next[index] = {
        res: filtered,
        next: {},
      };

      return applyRestrictions(filtered, current.next[index], i + 1);
    }

    const filteredTeams = applyRestrictions(teams, memo);

    return {
      sets: subRestrictions.map((elem) => String.fromCharCode(elem.index + 65)),
      size: filteredTeams.length,
      teams: filteredTeams,
    };
  });

  return sets;
}

const VennDiagram = ({
  teams,
  restrictions,
}: {
  teams: Team[];
  restrictions: Restriction[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (teams.length == 0) return;

    const sets = createSets(teams, restrictions);

    const chart = VennDiagramJS(width * 0.8, height * 0.8);
    d3.select(ref.current).datum(sets).call(chart);
  }, [restrictions]);

  return <div ref={ref} />;
};

export default VennDiagram;
