import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
interface Bewohner {
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
interface FilteredBewohner {
  filteredBewohner: Bewohner[];
}
const Bewohnerrow: React.FC<FilteredBewohner> = ({ filteredBewohner }) => {
  return (
    <FlatList
      style={{
        width: "95%",
        height: "90%",
      }}
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      data={filteredBewohner}
      keyExtractor={(item, index) => item.BewohnerNr + index}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/posts/cardsview",
              params: {
                BewohnerId: item.ID,
                Bname: item.Anrede + " " + item.Name + ", " + item.Vorname,
              },
            })
          }
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderBottomColor: "#343434",
              borderBottomWidth: 1,
              paddingVertical: 15,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                width: "8%",
                color: "#FFF",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {item.IsBirthdayToday == "true" ? (
                <FontAwesome name="birthday-cake" color={"#FFF"} size={18} />
              ) : (
                ""
              )}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "12%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
              }}
            >
              {item.Anrede}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "38%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
              }}
            >
              {item.Name}, {item.Vorname}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "12%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
                textAlign: "right",
              }}
            >
              {item.BewohnerNr}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "10%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
                textAlign: "right",
              }}
            >
              {item.Station}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "10%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
                textAlign: "right",
              }}
            >
              {item.Znummer}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: "8%",
                color: "#FFF",
                paddingRight: 10,
                fontSize: 18,
                textAlign: "right",
              }}
            >
              {item.Pflegestufe}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
export default Bewohnerrow;
