import express, { Request } from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.put("/", (req, res) => {
  res.json(req.body);
});

app.delete("/:id", (req: Request, res) => {
  res.json({ deleted: req.params.id });
});

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});
