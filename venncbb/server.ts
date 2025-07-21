import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

const PORT = 3001;

app.use(cors());
app.use(express.json());

const reduced = {
  Tournament_Winner_: true,
  Mapped_ESPN_Team_Name: true,
  logos: true,
  Season: true,
  Full_Team_Name: true,
  Short_Conference_Name: true,
  Net_Rating: true,
  Adjusted_Offensive_Efficiency: true,
  Adjusted_Defensive_Efficiency: true,
  Adjusted_Tempo: true,
};

app.post("/teams", async (_req, res) => {
  const orderBy = (_req.body?.orderBys ?? []).map(({ id, dir }) => {
    return { [id]: dir };
  });

  const result = await prisma.team.findMany({
    orderBy,
    where: { NOT: { Full_Team_Name: null }, Season: { lte: 2024 } },
    select: {
      Tournament_Winner_: true,
      Mapped_ESPN_Team_Name: true,
      logos: true,

      Season: true,
      Full_Team_Name: true,
      Short_Conference_Name: true,

      Net_Rating: true,

      Adjusted_Offensive_Efficiency: true,
      Adjusted_Defensive_Efficiency: true,
      Adjusted_Tempo: true,

      Raw_Offensive_Efficiency: true,
      Raw_Defensive_Efficiency: true,
      Raw_Tempo: true,

      eFGPct: true,
      FG2Pct: true,
      FG3Pct: true,
      FTPct: true,

      TOPct: true,
      BlockPct: true,

      OppFG2Pct: true,
      OppFG3Pct: true,
      OppFTPct: true,

      OppBlockPct: true,
    },
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
