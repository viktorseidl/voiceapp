import { IconListOnTerm } from "@/constants/IconListOnTerm";
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const IconRenderer = ({ term }: { term: string }) => {
  const { name, library } = IconListOnTerm(term);

  const IconComponent = {
    MaterialCommunityIcons,
    MaterialIcons,
    Feather,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
  }[library];

  return <IconComponent name={name} size={60} color="#FFF" />;
};

export default IconRenderer;
