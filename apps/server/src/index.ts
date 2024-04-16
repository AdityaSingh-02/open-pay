import express from "express";
import router from "./routes";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use("/api", router);
const db = new PrismaClient();
app.get("/user", async (req, res) => {
  console.log("adding");
  const user = await db.user.create({
    data: {
      name: "Aditya Singh",
      email: "asaditya2002",
      password: "Aditya@686",
      number: Number("7982556413"),
      balance: {
        create: {
          amount: 1000,
          locked: 1000,
        },
      },
    },
  });
});

app.listen(3002, () => console.log("Server running on 3002"));
