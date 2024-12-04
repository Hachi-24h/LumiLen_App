import { Image } from "react-native";

export const convertDataWithSize = async (data) => {
  const imagesWithSize = await Promise.all(
    data.map(async (item) => {
      return new Promise((resolve) => {
        Image.getSize(
          item.uri,
          (width, height) => {
            resolve({
              id: item._id,
              uri: item.uri,
              width,
              height,
              userId: item.idUser,
              title: item.title,
            });
          },
          () => {
            resolve({
              id: item._id,
              uri: item.uri,
              width: 0,
              height: 0,
              userId: item.id,
              title: item.title,
            });
          }
        );
      });
    })
  );
  return imagesWithSize;
};
