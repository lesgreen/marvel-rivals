import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { JsonCard } from "./src/components/JsonCard";
import { fetchHeroes, fetchPlayer } from "./src/lib/marvelApi";

type ApiState = {
  loading: boolean;
  error: string | null;
  data: unknown;
};

const initialState: ApiState = {
  loading: false,
  error: null,
  data: null
};

export default function App() {
  const [heroQuery, setHeroQuery] = useState("");
  const [playerUsername, setPlayerUsername] = useState("");
  const [playerSeason, setPlayerSeason] = useState("");

  const [heroesState, setHeroesState] = useState<ApiState>(initialState);
  const [playerState, setPlayerState] = useState<ApiState>(initialState);

  const hasResults = useMemo(
    () => heroesState.data !== null || playerState.data !== null,
    [heroesState.data, playerState.data]
  );

  async function onFetchHeroes() {
    setHeroesState({ loading: true, error: null, data: null });

    try {
      const data = await fetchHeroes(heroQuery);
      setHeroesState({ loading: false, error: null, data });
    } catch (error) {
      setHeroesState({
        loading: false,
        error: error instanceof Error ? error.message : "Unexpected error",
        data: null
      });
    }
  }

  async function onFetchPlayer() {
    const username = playerUsername.trim();

    if (!username) {
      setPlayerState({
        loading: false,
        error: "Enter a player username",
        data: null
      });
      return;
    }

    setPlayerState({ loading: true, error: null, data: null });

    try {
      const data = await fetchPlayer(username, playerSeason);
      setPlayerState({ loading: false, error: null, data });
    } catch (error) {
      setPlayerState({
        loading: false,
        error: error instanceof Error ? error.message : "Unexpected error",
        data: null
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>Marvel Rivals API</Text>
        <Text style={styles.title}>Expo Starter</Text>
        <Text style={styles.subtitle}>
          Same functionality as the Next.js app: fetch heroes and player stats.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Heroes</Text>
          <Text style={styles.label}>Hero name (optional)</Text>
          <TextInput
            value={heroQuery}
            onChangeText={setHeroQuery}
            placeholder="e.g. Magik"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Pressable style={styles.button} onPress={onFetchHeroes}>
            {heroesState.loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Fetch Heroes</Text>
            )}
          </Pressable>
          {heroesState.error ? (
            <Text style={styles.error}>{heroesState.error}</Text>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Player</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={playerUsername}
            onChangeText={setPlayerUsername}
            placeholder="e.g. somePlayer"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Season (optional)</Text>
          <TextInput
            value={playerSeason}
            onChangeText={setPlayerSeason}
            placeholder="e.g. 2"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Pressable style={styles.button} onPress={onFetchPlayer}>
            {playerState.loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Find Player</Text>
            )}
          </Pressable>
          {playerState.error ? (
            <Text style={styles.error}>{playerState.error}</Text>
          ) : null}
        </View>

        {hasResults ? (
          <>
            {heroesState.data !== null ? (
              <JsonCard title="Heroes Response" data={heroesState.data} />
            ) : null}
            {playerState.data !== null ? (
              <JsonCard title="Player Response" data={playerState.data} />
            ) : null}
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Results</Text>
            <Text style={styles.subtitle}>Run a query to see live API responses.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eff4ff"
  },
  container: {
    padding: 16,
    paddingBottom: 30
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
    color: "#0052cc",
    marginBottom: 8,
    fontSize: 12
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1b2338",
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: "#485476",
    lineHeight: 20
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d7e0f2",
    backgroundColor: "#ffffff",
    padding: 14,
    marginTop: 14
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b2338",
    marginBottom: 8
  },
  label: {
    fontSize: 13,
    color: "#485476",
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7e0f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "#1b2338",
    backgroundColor: "#fbfdff"
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#0052cc",
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  error: {
    color: "#b0003a",
    marginTop: 10,
    fontSize: 13
  }
});
