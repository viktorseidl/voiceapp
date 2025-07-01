import Fuse from "fuse.js";
import { useMemo } from "react";

export interface Bewohner {
  ID: string;
  BewohnerNr: string;
  Anrede: string;
  Name: string;
  Vorname: string;
  Station: string;
  Znummer: string;
  Pflegestufe: string;
  IsBirthdayToday: string;
  Schwerbehindert: string;
  inkontinent: string;
}

export function useBewohnerMatcher(bewohnerList: Bewohner[]) {
  const fuse = useMemo(() => {
    return new Fuse(bewohnerList, {
      threshold: 0.4,
      keys: [
        "Name",
        "Vorname",
        {
          name: "fullName",
          getFn: (b: Bewohner) => `${b.Name} ${b.Vorname}`,
        },
        {
          name: "commaName",
          getFn: (b: Bewohner) => `${b.Name}, ${b.Vorname}`,
        },
      ],
    });
  }, [bewohnerList]);

  function matchBewohner(input: string): Bewohner | null | string {
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

  return { matchBewohner };
}
