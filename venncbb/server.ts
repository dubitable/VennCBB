import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

const PORT = 3001;

app.post("/teams", async (_req, res) => {
  const result = await prisma.team.findMany({
    orderBy: { Season: "asc" },
    where: { NOT: { Full_Team_Name: null } },
    select: {
      Tournament_Winner_: true,
      logos: true,
      Mapped_ESPN_Team_Name: true,
      Season: true,
      Full_Team_Name: true,
      Short_Conference_Name: true,
      Net_Rating: true,
      Adjusted_Offensive_Efficiency: true,
      Adjusted_Defensive_Efficiency: true,
      Adjusted_Tempo: true,
    },
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
