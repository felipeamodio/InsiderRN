import styled from 'styled-components/native';

export const ContainerButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.21);
    margin: 7px 10px;
    padding: 12px;
    border-radius: 7px;
`;

export const Item = styled.Text`
    color: #FFFFFF;
    padding-left: 10px;
    padding-right: 20px;
    font-size: 18px;
`;

export const ActionContainer = styled.TouchableOpacity`
    width: 12%;
    background-color: #FF5555;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    margin: 7px 10px;
`;