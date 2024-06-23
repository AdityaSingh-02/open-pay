import express from "express";
import router from "./routes";
import prisma from "./prismaSingleton"

const app = express();
app.use(express.json())

app.use("/api/v1", router);

app.get("/user", async (req, res) => {
  console.log("adding");
  try {
    const user = await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "doe",
        email: "joh3does",
        number: "111111132",
        password: "password",
        username: "johnd32",
        accounts: {
          create: {
            accountNumber: "121121111",
            balance: {
              create: {
                amount: 0,
                locked: 0
              }
            }

          }
        }
      },
    });
    if (user) {
      console.log("Success", user)
      return res.status(200).send("success")
    }
  } catch (error: any) {
    return res.status(400).json({ code: error.code, meta: error.meta.target })
  }
});

app.listen(3002, () => console.log("Server running on 3002"));
