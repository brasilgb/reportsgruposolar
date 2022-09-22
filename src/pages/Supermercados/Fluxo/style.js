import styled from "styled-components";

export const ContainerButtomFluxo = styled.View`
flex-direction: row; 
align-items: center; 
justify-content: center;
padding: 0px 2px;
margin: 5px 0px;
background-color: ${props => props.bgcolor ? props.bgcolor : "#fff"};
`;

export const LButtomFluxo = styled.TouchableOpacity`
background-color: ${props => props.bgcolor ? props.bgcolor : "#fff"};
flex: 1;
align-items: center;
justify-content: center;
elevation: 6;
border-radius: 5px;
border-width: 1px;
border-color: #fff;
margin: 0px 2px;
padding: 4px 0px;
`;

LButtomFluxo.TextButtom = styled.Text`
font-size: 11px;
font-family: "Roboto_500Medium";
color: ${props => props.color ? props.color : "#FFF"};
text-align: center;
text-transform: uppercase;
padding: 5px 0px 5px;
`;