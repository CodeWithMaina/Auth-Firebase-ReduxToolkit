// hooks/useGallery.js
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useDispatch } from "react-redux";
import { addMedia, setMedia } from "../redux/slices/mediaSlice";

export const useGallery = () => {
  const dispatch = useDispatch();

  const saveToGallery = async (uri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      dispatch(addMedia(asset.uri));
    } catch (error) {
      console.error("Error saving to gallery:", error);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setMedia(result.assets.map((asset) => asset.uri)));
    }
  };

  return { saveToGallery, pickFromGallery };
};