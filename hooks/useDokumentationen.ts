import Fuse from "fuse.js";
import { useMemo } from "react";

interface Leistung {
  LeistungsID: string;
  Leistungsbezeichnung: string;
  LeistungsNummer: string;
  LeistungsTitel: string;
}

export function useDokumentationenMatcher(docuList: Leistung[]) {
  const fuse = useMemo(() => {
    return new Fuse(docuList, {
      threshold: 0.4,
      keys: [
        "LeistungsTitel",
        {
          name: "fullName",
          getFn: (b: Leistung) => `${b.LeistungsTitel}`,
        },
      ],
    });
  }, [docuList]);

  function matchDoku(input: string): Leistung | null | string {
    if (
      !input ||
      input.length < 2 ||
      input.trim().toLocaleLowerCase() == "alle anzeigen" ||
      input.trim().toLocaleLowerCase() == "zurück" ||
      input.trim().toLocaleLowerCase() == "beenden"
    )
      return "beenden";
    const result = fuse.search(input);
    return result.length > 0 ? result[0].item : "beenden";
  }

  return { matchDoku };
}
