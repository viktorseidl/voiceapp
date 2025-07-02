type IconResult = {
  name: string;
  library:
    | "Feather"
    | "FontAwesome5"
    | "FontAwesome6"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Ionicons";
};

export function IconListOnTerm(term: string): IconResult {
  const normalized = term.toLowerCase();

  if (normalized.includes("katheter"))
    return { name: "procedures", library: "FontAwesome5" };
  if (normalized.includes("sättigung"))
    return { name: "diving-scuba-tank", library: "MaterialCommunityIcons" };
  if (normalized.includes("dekubitus"))
    return { name: "bed", library: "FontAwesome5" };
  if (normalized.includes("miktions"))
    return { name: "toilet", library: "MaterialCommunityIcons" };
  if (normalized.includes("lagerungsprotokoll"))
    return { name: "bed-empty", library: "MaterialCommunityIcons" };
  if (normalized.includes("co2"))
    return { name: "molecule-co2", library: "MaterialCommunityIcons" };
  if (normalized.includes("medikamente stellen"))
    return { name: "pill", library: "MaterialCommunityIcons" };
  if (normalized.includes("hilfsmittel"))
    return { name: "assist-walker", library: "MaterialIcons" };
  if (normalized.includes("hba1c"))
    return { name: "test-tube", library: "MaterialCommunityIcons" };
  if (normalized.includes("bmi"))
    return { name: "scale-bathroom", library: "MaterialCommunityIcons" };
  if (normalized.includes("wundversorgungpfk"))
    return { name: "bandage", library: "FontAwesome6" };
  if (normalized.includes("fixierung"))
    return { name: "lock", library: "Feather" };
  if (normalized.includes("behandlungspflege"))
    return { name: "clipboard-pulse", library: "MaterialCommunityIcons" };
  if (normalized.includes("blutdruck"))
    return { name: "heart-pulse", library: "MaterialCommunityIcons" };
  if (normalized.includes("blutzucker"))
    return { name: "water", library: "FontAwesome6" };
  if (normalized.includes("ein") || normalized.includes("ausfuhr"))
    return { name: "swap-vertical", library: "Ionicons" };
  if (normalized.includes("trink"))
    return { name: "cup-water", library: "MaterialCommunityIcons" };
  if (normalized.includes("gewicht"))
    return { name: "weight-kilogram", library: "MaterialCommunityIcons" };
  if (normalized.includes("lagerung"))
    return { name: "bed", library: "FontAwesome5" };
  if (normalized.includes("medikamentengabe"))
    return { name: "syringe", library: "MaterialCommunityIcons" };
  if (normalized.includes("mobilitäts"))
    return { name: "run-fast", library: "MaterialCommunityIcons" };
  if (normalized.includes("ernährungs"))
    return { name: "food-apple-outline", library: "MaterialCommunityIcons" };
  if (normalized.includes("stuhlgang"))
    return { name: "toilet", library: "MaterialCommunityIcons" };
  if (normalized.includes("temperatur"))
    return { name: "thermometer", library: "Feather" };
  if (normalized.includes("wundversorgung"))
    return { name: "bandage", library: "MaterialCommunityIcons" };

  // Default fallback
  return { name: "file-text", library: "Feather" };
}
