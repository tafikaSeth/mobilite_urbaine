import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

const data = [
  {
    id: "1",
    name: "Graha Mall",
    address: "034 45 171 67",
    price: "7 000 ar/heure",
    time: "7 min",
    image: require("../../assets/images/user.jpg"),
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
      <SearchBar>
        <Icon name="search" size={20} color="#8A96BC" />
        <SearchInput placeholder="Search" placeholderTextColor="#8A96BC" />
      </SearchBar>
      <TabContainer>
      <TouchableOpacity  onPress={() => setActiveTab("today")}>
      {activeTab === "today"? <ActiveTab>
          <TabTextActive>Aujourd'hui</TabTextActive>
          <RedDot />
        </ActiveTab> : <TabText>Aujourd'hui</TabText>}
        
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => setActiveTab("past")}>
      {activeTab === "past"? <ActiveTab>
        <RedDot />
          <TabTextActive>Depassé</TabTextActive>
          
        </ActiveTab> : <TabText>Depassé</TabText>}
        
        </TouchableOpacity>
        
      
      </TabContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <CardImage source={item.image} />
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
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
            <ModalTitle>Ajouter un parking</ModalTitle>
            <StyledInput
              placeholder="Nom"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <StyledInput
              placeholder="Adresse"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />
            <StyledInput
              placeholder="Prix"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            <StyledInput
              placeholder="Temps"
              value={formData.time}
              onChangeText={(text) => setFormData({ ...formData, time: text })}
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
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e8eaf6;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  color: #8a96bc;
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
  color: #8A96BC;
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
  color: ${(props: any) => (props.primary ? "white" : "black")};
  font-weight: bold;
`;


