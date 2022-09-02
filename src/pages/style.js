import styled from 'styled-components/native';

export const BoxHome = styled.SafeAreaView`
flex: 1;
`;

export const ScreenArea = styled.View`
flex: 4;
`;

export const GraphArea = styled.View`
flex: 1;

/* background-color: #FFF; */
padding-top: 30px;
`;
export const ButtonArea = styled.View`
/* flex: 1; */
/* align-items: flex-start;
justify-content: flex-end; */
/* background-color: #FFF; */
padding-left: 2px;
padding-top: 2px;
`;
export const AreaUm = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-around;
height: ${(props) => props.height ? props.height : '0px'};
padding-top: ${(props) => props.paddingTop ? props.paddingTop : '10px'};
`;

export const ContainerText = styled.View`
padding: 10px 0px 20px;
align-items: center;
`;

ContainerText.Title = styled.Text`
font-size: 18px;
font-family: "Roboto_700Bold";
color: ${props => props.color ? props.color : "#333"};
`;

ContainerText.Value = styled.Text`
font-size: 22px;
font-family: "Roboto_700Bold";
color: ${props => props.color ? props.color : "#333"};
`;

export const LButtomHome = styled.TouchableOpacity`
background-color: ${props => props.bgcolor};
height: 100px;
align-items: center;
justify-content: center;
elevation: 6;
border-radius: 5px;
border-width: 2px;
border-color: #FFF;
margin-bottom: 20px;
`;

export const TabContainer = styled.View`
flex: 4;
margin-top: 0px;
background-color: #FFF;
`;