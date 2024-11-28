import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import styles from "../../Css/Info_Bang_Css";
import Footer from "../Other/footer";
import { UserContext } from "../../Hook/UserContext";

const { width, height } = Dimensions.get("window");

const Info_Bang_Screen = ({ navigation, route }) => {
  const DefaultAvatar = require("../../Picture/defaulttableuser.jpg");

  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;
  const originalListTableUser = userData ? userData.collectionUser : [];
  const userId = userData ? userData._id : null;

  const [selectItem, setSelectItem] = useState("Tất cả");
  const [displayedListTableUser, setDisplayedListTableUser] = useState(
    originalListTableUser
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [status, setStatus] = useState("Oldest");
  useEffect(() => {
    handleSearch(searchQuery);
  }, [selectItem, searchQuery, originalListTableUser]);

  const handleSort = (sortType) => {
    if (selectItem === "Tất cả") {
      let sortedList = [...originalListTableUser];
      switch (sortType) {
        case "A-Z":
          setStatus("A-Z");
          sortedList.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "LastSaved":
          setStatus("LastSaved");
          sortedList.sort((a, b) => {
            const lastImageA =
              a.listAnh.length > 0
                ? a.listAnh[a.listAnh.length - 1].createdAt
                : new Date(0);
            const lastImageB =
              b.listAnh.length > 0
                ? b.listAnh[b.listAnh.length - 1].createdAt
                : new Date(0);
            return new Date(lastImageB) - new Date(lastImageA);
          });
          break;
        case "Newest":
          setStatus("Newest");
          sortedList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "Oldest":
          setStatus("Oldest");
          sortedList.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        default:
          break;
      }
      setDisplayedListTableUser(sortedList);
    }
    setSortModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const query = text.trim().toLowerCase();
    const filteredUsers = originalListTableUser.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    const resultList =
      selectItem === "Tất cả"
        ? filteredUsers
        : filteredUsers.filter((user) => user.statusTab === "block");
    setDisplayedListTableUser(resultList);
  };

  const renderTableUser = ({ item }) => {
    const tableName = item.name;
    const numberOfImages = item.listAnh.length;
    const styleIcon = item.statusTab === "block" ? styles.lock : styles.null;

    const images = [
      item.listAnh[0] ? { uri: item.listAnh[0].uri } : DefaultAvatar,
      item.listAnh[1] ? { uri: item.listAnh[1].uri } : DefaultAvatar,
      item.listAnh[2] ? { uri: item.listAnh[2].uri } : DefaultAvatar,
    ];

    return (
      <View style={styles.boardItem}>
        <StatusBar hidden={false} />
        {/* {console.log("item._id", item._id, "\nuserId", userId)} */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TableDetail", {
              tableId: item._id,
              userId: userId,
            })
          }
          style={styles.boardImage}
        >
          <View style={styles.boardImage}>
            <View style={{ width: "50%", height: "100%", paddingRight: 1 }}>
              <Image source={images[0]} style={styles.img} />
              <View style={styleIcon}>
                <Image
                  source={require("../../Icon/lock.png")}
                  style={styles.lockIcon}
                />
              </View>
            </View>
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <View style={{ width: "100%", height: "50%", paddingBottom: 1 }}>
                <Image source={images[1]} style={styles.img} />
              </View>
              <View style={{ width: "100%", height: "50%" }}>
                <Image source={images[2]} style={styles.img} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.boardTitle}>{tableName}</Text>
        <Text style={styles.boardDetails}>{numberOfImages} ghim</Text>
      </View>
    );
  };

  const [translateY] = useState(new Animated.Value(100)); // Khởi tạo Animated.Value, modal sẽ bắt đầu từ dưới
  useEffect(() => {
    if (isSortModalVisible) {
      // Khi modal xuất hiện, animate slide from bottom
      Animated.timing(translateY, {
        toValue: 0, // Đưa modal về vị trí ban đầu
        duration: 200, // Thời gian animation (ms)
        useNativeDriver: true,
      }).start();
    } else {
      // Khi modal bị đóng, animate slide out down
      Animated.timing(translateY, {
        toValue: 200, // Đưa modal xuống dưới
        duration: 200, // Thời gian animation (ms)
        useNativeDriver: true,
      }).start();
    }
  }, [isSortModalVisible]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar hidden={false} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountSetting")}
              style={styles.TouchableOpacitystyle}
            >
              <Image source={{ uri: avatar }} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenter}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Info_Ghim", {
                  initialSelectedIcon: "account",
                })
              }
            >
              <Text style={styles.headerTitle2}>Ghim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Info_Bang")}>
              <Text style={[styles.headerTitle, styles.activeTab]}>Bảng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setCreateModalVisible(true)}>
              <Image
                source={require("../../Icon/add.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Tìm Ghim của bạn"
            value={searchQuery}
            onChangeText={(text) => handleSearch(text.trim())}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.navtouch]}
            onPress={() => setSortModalVisible(true)}
          >
            <Image
              source={require("../../Icon/sort.png")}
              style={styles.imgHeader3}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                borderWidth: selectItem === "Tất cả" ? 2 : 1,
                // borderColor: selectItem === "Tất cả" ? "red" : "black",
              },
            ]}
            onPress={() => setSelectItem("Tất cả")}
          >
            <Text
              style={[
                styles.filterText,
                {
                  fontWeight: selectItem === "Tất cả" ? "bold" : "normal",
                  fontSize:
                    selectItem === "Tất cả" ? height * 0.022 : height * 0.02,
                },
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                borderWidth: selectItem === "Bí mật" ? 2 : 1,
                // borderColor: selectItem === "Bí mật" ? "red" : "black",
              },
            ]}
            onPress={() => setSelectItem("Bí mật")}
          >
            <Text
              style={[
                styles.filterText,
                {
                  fontWeight: selectItem === "Bí mật" ? "bold" : "normal",
                  fontSize:
                    selectItem === "Bí mật" ? height * 0.022 : height * 0.02,
                },
              ]}
            >
              Bí mật
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.ListTab}>
          {displayedListTableUser.length === 0 ? (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>
                {searchQuery
                  ? "Không có bảng nào hic hic . đi tạo bảng ngay nào"
                  : "Không có bảng nào , tạo ngay nào"}
              </Text>
            </View>
          ) : (
            <FlatList
              data={displayedListTableUser}
              renderItem={renderTableUser}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.boardList}
              keyExtractor={(item) => item._id}
            />
          )}
        </View>

        <Footer
          navigation={navigation}
          avatar={avatar}
          initialSelectedIcon={"account"}
          namePage={"Trang Thông tin"}
        />

        {/* Sort Modal */}
        <Modal
          visible={isSortModalVisible}
          animationType="none" // Tắt animation mặc định của Modal
          transparent={true}
          onRequestClose={() => setSortModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[styles.modalContent, { transform: [{ translateY }] }]}
                >
                  <Text style={styles.modalTitle}>Sắp xếp theo</Text>
                  <TouchableOpacity
                    onPress={() => handleSort("A-Z")}
                    style={styles.buttonsort}
                  >
                    <Text style={styles.modalOption}>Từ A đến Z</Text>
                    {status === "A-Z" && (
                      <Image
                        source={require("../../Icon/check_2.png")}
                        style={styles.imgHeader3}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSort("LastSaved")}
                    style={styles.buttonsort}
                  >
                    <Text style={styles.modalOption}>
                      Được lưu lần cuối vào
                    </Text>
                    {status === "LastSaved" && (
                      <Image
                        source={require("../../Icon/check_2.png")}
                        style={styles.imgHeader3}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSort("Newest")}
                    style={styles.buttonsort}
                  >
                    <Text style={styles.modalOption}>Mới nhất</Text>
                    {status === "Newest" && (
                      <Image
                        source={require("../../Icon/check_2.png")}
                        style={styles.imgHeader3}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSort("Oldest")}
                    style={styles.buttonsort}
                  >
                    <Text style={styles.modalOption}>Cũ nhất</Text>
                    {status === "Oldest" && (
                      <Image
                        source={require("../../Icon/check_2.png")}
                        style={styles.imgHeader3}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                    <Text style={styles.modalCloseButton}>Đóng</Text>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Create Modal */}
        <Modal
          visible={isCreateModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCreateModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setCreateModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.createModalContent}>
                <View style={styles.buttoncancel}>
                  <TouchableOpacity
                    onPress={() => setCreateModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Image
                      source={require("../../Icon/cancel.png")}
                      style={styles.optionIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.createModalTitle}>Bắt đầu tạo ngay</Text>
                </View>
                <View style={styles.createOptions}>
                  <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() =>
                        navigation.navigate(
                          "AddGhim",
                          { userId },
                          setCreateModalVisible(false)
                        )
                      }
                    >
                      <Image
                        source={require("../../Icon/upload.png")}
                        style={styles.optionIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Ghim</Text>
                  </View>

                  <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity style={styles.optionButton}>
                      <Image
                        source={require("../../Icon/abum.png")}
                        style={styles.optionIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Bảng</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Info_Bang_Screen;
