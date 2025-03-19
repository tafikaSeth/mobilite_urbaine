import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";

// Définir une interface pour les props de ToggleButton
interface ToggleButtonProps {
  isActive: boolean;
}

const Container = styled.View`
  flex: 1;
  margin-top: 24px;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: #ff3b3f;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

const ToggleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color:#f5f5f5;
  border-radius: 16px;
  margin-bottom: 20px;
`;

// Appliquer l'interface ToggleButtonProps au composant ToggleButton
const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: ${(props) => (props.isActive ? "#ff3b3f" : "#f5f5f5")};
  margin: 5px;
`;

const ToggleButtonText = styled.Text<ToggleButtonProps>`
  font-size: 16px;
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  font-weight: bold;
`;

const RegisterScreen = () => {
  const [isAmande, setIsAmande] = useState(true);

  const toggleForm = (selected: string) => {
    setIsAmande(selected === "Amande");
  };

  return (
    <Container>
      <Title>Payement</Title>
      <Subtitle>payable via mobile money</Subtitle>

      {/* Boutons Toggle */}
      <ToggleContainer>
        <ToggleButton
          isActive={isAmande}
          onPress={() => toggleForm("Amande")}
        >
          <ToggleButtonText isActive={isAmande}>Amande</ToggleButtonText>
        </ToggleButton>
        <ToggleButton
          isActive={!isAmande}
          onPress={() => toggleForm("Licence")}
        >
          <ToggleButtonText isActive={!isAmande}>Licence</ToggleButtonText>
        </ToggleButton>
      </ToggleContainer>

      {/* Formulaire conditionnel */}
      {isAmande ? (
        <>
          <InputContainer>
            <InputWrapper>
              <FontAwesome5 name="user" size={20} color="#999" />
              <Input placeholder="Matricule voiture" />
            </InputWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper>
              <MaterialIcons name="money" size={20} color="#999" />
              <Input placeholder="prix" keyboardType="email-address" />
            </InputWrapper>
          </InputContainer>
        </>
      ) : (
        <>
          <InputContainer>
            <InputWrapper>
            <MaterialIcons name="email" size={20} color="#999" />
              <Input placeholder="email pour recevoir le doc" secureTextEntry />
            </InputWrapper>
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <Feather name="file" size={20} color="#999" />
              <Input placeholder="dossiers pour le renouvelement" keyboardType="phone-pad" />
            </InputWrapper>
            
          </InputContainer>
          <InputContainer>
            <InputWrapper>
            <MaterialIcons name="money" size={20} color="#999" />
              <Input placeholder="tarif licence" keyboardType="phone-pad" />
            </InputWrapper>
            
          </InputContainer>
        </>
      )}

      <Button>
        <ButtonText>Payer maintenant  →</ButtonText>
      </Button>
    </Container>
  );
};

export default RegisterScreen;