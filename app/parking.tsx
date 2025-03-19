import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

const data = [
  {
    id: "1",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "2",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "3",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "4",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "5",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "6",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "7",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "8",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "9",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "10",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
  {
    id: "11",
    name: "1234 FC",
    address: "034 45 171 67",
    price: "voiture",
    time: "7 min",
    image: require("../assets/images/user.jpg"),
  },
];

const ExploreScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "past">("today");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    time: "",
  });

  return (
    <Container>
      <Title>Gestion Parking</Title>
      <TabContainer>
        <TouchableOpacity onPress={() => setActiveTab("today")}>
          {activeTab === "today" ? (
            <ActiveTab>
              <TabTextActive>4 parking disponibles</TabTextActive>
              <RedDot />
            </ActiveTab>
          ) : (
            <TabText>4 parking disponibles</TabText>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("past")}>
          {activeTab === "past" ? (
            <ActiveTab>
              <RedDot />
              <TabTextActive>11 / 15</TabTextActive>
            </ActiveTab>
          ) : (
            <TabText>11 / 15</TabText>
          )}
        </TouchableOpacity>
      </TabContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <CardImage source={item.image} />
            <CardContent>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <AddButton onPress={() => alert("Message de notification envoyer a " + item.address)}>
                <ButtonText>Notifier</ButtonText>
                </AddButton>
              </CardHeader>
              <CardAddress>{item.address}</CardAddress>
              <CardRow>
                <CardPrice>{item.price}</CardPrice>
                <TimeBadge>
                  <TimeText>{item.time}</TimeText>
                </TimeBadge>
              </CardRow>
            </CardContent>
          </Card>
        )}
      />

      {/* Floating Button */}
      <FloatingButton onPress={() => setModalVisible(true)}>
        <Icon name="add" size={24} color="#fff" />
      </FloatingButton>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Attribuer une parking</ModalTitle>
            <StyledInput
              placeholder="Type"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <StyledInput
              placeholder="Matricule transport"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />
            <StyledInput
              placeholder="Telephone chauffeur"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            
            <ButtonRow>
              <ModalButton onPress={() => setModalVisible(false)}>
                <ButtonText>Annuler</ButtonText>
              </ModalButton>
              <ModalButton onPress={() => setModalVisible(false)}>
                <ButtonText>Ajouter</ButtonText>
              </ModalButton>
            </ButtonRow>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default ExploreScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #f5f6fa;
  margin-top: 24px;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;

const Card = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

const CardImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const CardContent = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const CardAddress = styled.Text`
  color: gray;
  font-size: 14px;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const CardPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: red;
`;

const TimeBadge = styled.View`
  background-color: #ffebee;
  padding: 5px 10px;
  border-radius: 15px;
`;

const TimeText = styled.Text`
  color: red;
  font-size: 12px;
  font-weight: bold;
`;

const AddButton = styled.TouchableOpacity`
  background-color:rgb(209, 0, 0);
  padding: 8px 16px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #13131a;
  padding: 15px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ActiveTab = styled.View`
  background-color: #13131a;
  padding: 10px 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const TabTextActive = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const RedDot = styled.View`
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 3px;
  margin-left: 5px;
`;

const TabText = styled.Text`
  color: #8a96bc;
  font-weight: bold;
  margin-right: 10px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledInput = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${(props: any) => (props.primary ? "#13131a" : "#ccc")};
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;