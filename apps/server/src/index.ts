import express from "express";
import router from "./routes";
import prisma from "./prismaSingleton"

const app = express();
app.use("/api", router);
app.get("/user", async (req, res) => {
  console.log("adding");
  const user = await prisma.user.create({
    data: {
      name: "John doe",
      email: "johndoe",
      number: "111111111",
      password: "password",
      username: "johndoe",
      balance: {
        create: {
          amount: 1000,
          locked: 0
        }
      }
    },
  });
  console.log(user);
});

app.listen(3002, () => console.log("Server running on 3002"));
