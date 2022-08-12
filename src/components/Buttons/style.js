import styled from 'styled-components/native';

export const ScrollContainer = styled.View`
flex-direction: row; 
align-items: center; 
justify-content: center;
background-color: ${props => props.bgcolor};

`;

export const NavButton = styled.TouchableOpacity`
background-color: ${props => props.bgColor};
flex: 1;
width: 100px;
height: 90px;
align-items: center;
justify-content: center;
elevation: 2;
border-radius: 8px;
/* border-width: 1px;
border-color: #fff; */
margin: 4px;
`;

export const ButtomText = styled.Text`
font-size: 11px;
font-family: "Roboto_700Bold";
color: ${props => props.color ? props.color : "#FFF"};
text-align: center;
text-transform: uppercase;
padding: 5px 0px 5px;
`;

export const BackgroundIcon = styled.View`
background-color: ${props => props.bgColor};
text-align: center;
padding: 6px;
border-radius: 25px;
elevation: 1;
`;