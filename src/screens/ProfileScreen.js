import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../themes/ThemedComponents";

// Dummy JSON Data
const dummyProfile = {
  uid: "12345",
  username: "nasa",
  profileImage:
    "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
  posts: "3,946",
  followers: "95.3M",
  following: "77",
  bio: "🚀🌍 Exploring the universe and our home planet.",
  highlights: [
    { id: "1", title: "Join Us", icon: "📋" },
    { id: "2", title: "Wallpapers", icon: "📱" },
    { id: "3", title: "Follow", icon: "💙" },
    { id: "4", title: "Missions", icon: "🛰️" },
  ],
  postsImages: [
    { id: "1", image: require("../images/five.jpeg") },
    { id: "2", image: require("../images/five.jpeg") },
    { id: "3", image: require("../images/five.jpeg") },
    { id: "4", image: require("../images/five.jpeg") },
  ],
};

const ProfileScreen = () => {
  const authUser = useSelector((state) => state.auth.user);
  const isCurrentUser = authUser?.uid === dummyProfile.uid;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image
              source={{ uri: dummyProfile.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <ThemedText style={styles.username}>
            @{dummyProfile.username}
          </ThemedText>
          <ThemedText style={styles.bio}>{dummyProfile.bio}</ThemedText>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {dummyProfile.posts}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Posts</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {dummyProfile.followers}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Followers</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {dummyProfile.following}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Following</ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.followButton]}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          horizontal
          data={dummyProfile.highlights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.highlightItem}>
              <ThemedText style={styles.highlightIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.highlightText}>{item.title}</ThemedText>
            </View>
          )}
          contentContainerStyle={styles.highlightsContainer}
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          key={dummyProfile.postsImages.length}
          numColumns={2} // Two columns for better aesthetics
          data={dummyProfile.postsImages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.postImageContainer}>
              <Image source={item.image} style={styles.postImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.postsContainer}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { flex: 1, padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImageContainer: { alignItems: "center", marginBottom: 16 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#6A1B9A",
  },
  username: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#666666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 14, color: "#666666" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  followButton: { flex: 0.6, backgroundColor: "#6A1B9A", marginRight: 8 },
  buttonText: { fontWeight: "bold", fontSize: 18, color: "#FFFFFF" },
  highlightsContainer: {},
  highlightItem: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  highlightIcon: { fontSize: 24, marginBottom: 8 },
  highlightText: { fontSize: 14, color: "#333333" },
  postsContainer: {
    // paddingVertical: 10,
    paddingHorizontal: 5,
    // gap: 10, // Adds spacing between rows
  },
  postImageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#6A1B9A",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1, // Keeps images square
    borderRadius: 12, // Smooth rounded edges
  },
});

export default ProfileScreen;
