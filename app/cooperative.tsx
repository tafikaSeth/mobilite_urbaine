import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

// Données pour la liste des transports
const transportData = [
  {
    id: "1",
    name: "1254 FC",
    address: "Ligne 2",
    price: "Mr Mika NIVOARIJAONA",
    time: "7 min",
    image: require("../assets/images/bus.jpg"),
  },
  {
    id: "2",
    name: "1254 FC",
    address: "Ligne 2",
    price: "Mr Mika NIVOARIJAONA",
    time: "7 min",
    image: require("../assets/images/bus.jpg"),
  },
  {
    id: "3",
    name: "1254 FC",
    address: "Ligne 2",
    price: "Mr Mika NIVOARIJAONA",
    time: "7 min",
    image: require("../assets/images/bus.jpg"),
  },
];

// Données pour la liste des lignes
const lineData = [
  {
    id: "1",
    name: "Ligne 1",
    description: "Antananarivo - Antsirabe",
    image: require("../assets/images/line.jpg"),
  },
  {
    id: "2",
    name: "Ligne 2",
    description: "Antananarivo - Toamasina",
    image: require("../assets/images/line.jpg"),
  },
  {
    id: "3",
    name: "Ligne 3",
    description: "Antananarivo - Fianarantsoa",
    image: require("../assets/images/line.jpg"),
  },
];

const Cooperative = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"transports" | "lignes">("transports"); // État pour gérer l'onglet actif
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    time: "",
  });

  return (
    <Container>
      <Title>Gestion Voiture</Title>
      <SearchBar>
        <Icon name="search" size={20} color="#8A96BC" />
        <SearchInput placeholder="Search" placeholderTextColor="#8A96BC" />
      </SearchBar>
      <TabContainer>
        <TouchableOpacity onPress={() => setActiveTab("transports")}>
          {activeTab === "transports" ? (
            <ActiveTab>
              <TabTextActive>Liste des transports</TabTextActive>
              <RedDot />
            </ActiveTab>
          ) : (
            <TabText>Liste des transports</TabText>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("lignes")}>
          {activeTab === "lignes" ? (
            <ActiveTab>
              <TabTextActive>Liste des lignes</TabTextActive>
              <RedDot />
            </ActiveTab>
          ) : (
            <TabText>Liste des lignes</TabText>
          )}
        </TouchableOpacity>
      </TabContainer>

      {/* Affichage conditionnel des listes */}
      {activeTab === "transports" ? (
        <FlatList
          data={transportData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <CardImage source={item.image} />
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <CardAddress>{item.address}</CardAddress>
                <CardRow>
                  <CardPrice>{item.price}</CardPrice>
                </CardRow>
              </CardContent>
            </Card>
          )}
        />
      ) : (
        <FlatList
          data={lineData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <CardImage source={item.image} />
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <CardAddress>{item.description}</CardAddress>
              </CardContent>
            </Card>
          )}
        />
      )}

      {/* Floating Button */}
      <FloatingButton onPress={() => setModalVisible(true)}>
        <Icon name="add" size={24} color="#fff" />
      </FloatingButton>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Ajouter un transport</ModalTitle>
            <StyledInput
              placeholder="Matricule bus"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <StyledInput
              placeholder="Ligne"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />
            <StyledInput
              placeholder="Chauffeur"
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

export default Cooperative;

// Styled Components (inchangés)
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
  font-size: 12px;
  font-weight: bold;
  color: rgb(152, 152, 152);
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
  align-items: center;
  justify-content: space-between;
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
  color: ${(props: any) => (props.primary ? "white" : "black")};
  font-weight: bold;
`;