import { getAuth } from "firebase/auth";
import { app } from "./clientApp";

export const auth = getAuth(app);