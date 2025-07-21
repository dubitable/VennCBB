import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { DATASELECT } from "./src/maps.ts";

const app = express();
const prisma = new PrismaClient();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/teams", async (_req, res) => {
  const orderBy = (_req.body?.orderBys ?? []).map(({ id, dir }) => {
    return { [id]: dir };
  });

  const select = _req.body?.select ?? DATASELECT.REDUCED;

  const result = await prisma.team.findMany({
    orderBy,
    where: { NOT: { Full_Team_Name: null }, Season: { lte: 2024 } },
    select,
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
