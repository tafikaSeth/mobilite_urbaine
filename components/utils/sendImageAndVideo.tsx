import * as ImagePicker from "expo-image-picker"

export const handleMediaPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Inclut images et vidéos
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedMedia = result.assets[0].uri;
      const isVideo = result.assets[0].type === "video";
  
      // Créer le message pour l'image ou la vidéo
      const mediaMessage: IMessage = {
        _id: new Date().getTime(),
        createdAt: new Date(),
        user: { _id: 1, name: "client" },
        image: !isVideo ? selectedMedia : undefined, // Image si ce n'est pas une vidéo
        video: isVideo ? selectedMedia : undefined, // Vidéo si c'est une vidéo
      };
  
      onSend([mediaMessage]); // Envoi du message avec l'image ou la vidéo
    }
  };
  