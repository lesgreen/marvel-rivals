import { StyleSheet, Text, View } from "react-native";

type JsonCardProps = {
  title: string;
  data: unknown;
};

export function JsonCard({ title, data }: JsonCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.code}>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d7e0f2",
    backgroundColor: "#ffffff",
    padding: 14,
    marginTop: 14
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1b2338"
  },
  code: {
    fontFamily: "Courier",
    fontSize: 12,
    color: "#e9efff",
    backgroundColor: "#111a2f",
    padding: 10,
    borderRadius: 8
  }
});
