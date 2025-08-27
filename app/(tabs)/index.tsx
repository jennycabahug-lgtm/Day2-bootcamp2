import { useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, TextInput, FlatList, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

// Business Model Canvas sections with default values
const defaultCanvas = {
  Customers: ["Yourself", "Friends and family", "Hobby communities (online/offline)"],
  ValueProposition: ["Fun and relaxation", "Stress relief", "Personal growth and learning"],
  Relationships: ["Sharing hobby with friends", "Joining clubs or groups", "Participating in events or competitions"],
  Channels: ["Home or personal space", "Hobby clubs or community centers", "Online platforms (YouTube, Reddit, Instagram)"],
  KeyPartnerships: ["Friends with the same interest", "Mentors or instructors", "Local hobby shops or suppliers"],
  KeyActivities: ["Sharing results with others", "Participating in events"],
  KeyResources: ["Materials or tools (e.g., paint, guitar, camera)"],
  CostStructure: ["Buying materials or tools", "Classes or workshops"],
  RevenueStreams: ["Enjoyment and relaxation", "Friendships and connections"]
};

export default function HobbyCanvasScreen() {
  const [canvas, setCanvas] = useState(defaultCanvas);
  const [input, setInput] = useState("");
  const [selectedKey, setSelectedKey] = useState<keyof typeof defaultCanvas>("Customers");

  const addItem = () => {
    if (input.trim() !== "") {
      setCanvas(prev => ({
        ...prev,
        [selectedKey]: [...prev[selectedKey], input]
      }));
      setInput("");
    }
  };

  const removeItem = (item: string) => {
    setCanvas(prev => ({
      ...prev,
      [selectedKey]: prev[selectedKey].filter(val => val !== item)
    }));
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {/* Title */}
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">🎯 Hobby BMC</ThemedText>
            <HelloWave />
          </ThemedView>

          {/* React Logo */}
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />

          {/* Section Selector */}
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Select Section</ThemedText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Object.keys(canvas)}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.selectorRow}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.chip,
                    selectedKey === item && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedKey(item as keyof typeof defaultCanvas)}
                >
                  <ThemedText
                    style={[
                      styles.chipText,
                      selectedKey === item && styles.chipTextSelected,
                    ]}
                  >
                    {item}
                  </ThemedText>
                </Pressable>
              )}
            />
          </ThemedView>

          {/* Current Section Title */}
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">{selectedKey}</ThemedText>
          </ThemedView>
        </>
      }
      data={canvas[selectedKey]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ThemedView style={styles.hobbyItem}>
          <ThemedText>{item}</ThemedText>
          <Pressable style={styles.removeBtn} onPress={() => removeItem(item)}>
            <ThemedText style={styles.removeBtnText}>❌</ThemedText>
          </Pressable>
        </ThemedView>
      )}
      ListFooterComponent={
        <ThemedView style={styles.stepContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Add to ${selectedKey}`}
            value={input}
            onChangeText={setInput}
          />
          <Pressable style={styles.addBtn} onPress={addItem}>
            <ThemedText style={styles.addBtnText}>➕ Add</ThemedText>
          </Pressable>
        </ThemedView>
      }
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  hobbyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
    marginBottom: 16,
  },

  // Chips for section selector
  selectorRow: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#f9f9f9",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#4a90e2",
    borderColor: "#4a90e2",
  },
  chipText: {
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },

  // Remove button
  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#ff4d4d",
  },
  removeBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Add button
  addBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#4a90e2",
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
