import { useMemo } from "react";
import { db } from "@/firebase/firestore";

export function useFirestore() {
  return useMemo(() => ({ db }), []);
}
