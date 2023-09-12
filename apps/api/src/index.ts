import express, {
  type Application,
  type Request
  // Response,
  // NextFunction
} from "express";
import cors from "cors";

const app: Application = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(cors());

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
