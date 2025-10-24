import express from "express";
// Import the TypeScript source from the workspace package. Using the `.js` extension
// here fails when the compiled .js doesn't exist. Point to the TS file (or omit
// the extension) so Bun can resolve it directly.
import { prismaClient } from "../../packages/db/index.ts";


const app = express();
app.use(express.json());

app.get ("/", (req,res) => {
    res.send("Hello from backend!");
})

app.get("/users", (req, res) => {
    prismaClient.user.findMany()
    .then((users: any[]) => {
        res.json(users);
    })
    .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: message });
    })
})

app.post("/user", (req,res) =>{
    const {username, password} = req.body;
    if (!username || !password) {
        return  res.status(400).json({error: "Username and password are required"});
    }
    prismaClient.user.create({
        data: {
            username,
            password
        }
    })
    .then((user: any) => {
        res.status(201).json(user);
    })
    .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: message });
    })
})

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
})
