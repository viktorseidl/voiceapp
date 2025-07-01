import Fuse from "fuse.js";
import { useMemo } from "react";

export interface Docus {
  bezeichnung: string;
}

export function useDokumentationenMatcher(docuList: Docus[]) {
  const fuse = useMemo(() => {
    return new Fuse(docuList, {
      threshold: 0.4,
      keys: [
        "bezeichnung",
        {
          name: "fullName",
          getFn: (b: Docus) => `${b.bezeichnung}`,
        },
      ],
    });
  }, [docuList]);

  function matchDoku(input: string): Docus | null | string {
    if (
      !input ||
      input.length < 2 ||
      input.trim().toLocaleLowerCase() == "alle anzeigen" ||
      input.trim().toLocaleLowerCase() == "zurück" ||
      input.trim().toLocaleLowerCase() == "beenden"
    )
      return "beenden";
    const result = fuse.search(input);
    return result.length > 0 ? result[0].item : null;
  }

  return { matchDoku };
}
