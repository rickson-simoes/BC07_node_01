import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => res.json({ message: "yaaay" }));

export default routes;
