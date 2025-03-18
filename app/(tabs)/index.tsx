import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
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

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const TermsText = styled.Text`
  font-size: 12px;
  color: #999;
`;

const TermsLink = styled.Text`
  color: red;
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

const Footer = styled.Text`
  margin-top: 20px;
  color: #999;
`;

const LoginLink = styled.Text`
  color: red;
`;

const RegisterScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container>
      <Title>Payement</Title>
      <Subtitle>payanle via mobile money</Subtitle>

      <InputContainer>
        <InputWrapper>
          <FontAwesome5 name="user" size={20} color="#999" />
          <Input placeholder="Matricule voiture" />
        </InputWrapper>
      </InputContainer>

      <InputContainer>
        <InputWrapper>
          <MaterialIcons name="email" size={20} color="#999" />
          <Input placeholder="email pour envoye doc" keyboardType="email-address" />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          <FontAwesome5 name="lock" size={20} color="#999" />
          <Input placeholder="label" secureTextEntry />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          <Feather name="phone" size={20} color="#999" />
          <Input placeholder="montant" keyboardType="phone-pad" />
        </InputWrapper>
      </InputContainer>

      



      <Button>
        <ButtonText>Payer maintenant  →</ButtonText>
      </Button>


    </Container>
  );
};

export default RegisterScreen;
