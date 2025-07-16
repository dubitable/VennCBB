import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

const PORT = 3001;

app.get("/teams", async (_req, res) => {
  const result = await prisma.team.findMany({
    orderBy: [{ Season: "asc" }, { Full_Team_Name: "desc" }],
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
