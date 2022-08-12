import styled from 'styled-components/native';

export const Header = styled.View`
flex-direction: row;
align-items: center;
justify-content: flex-start;
padding: 8px 5px 8px;
background-color: ${props => props.color ? props.color : "#F5AB00"};
border-top-left-radius: 12px;
border-top-right-radius: 12px;
`;

Header.Title = styled.Text`
text-align: left;
font-size: 16px;
font-family: "Roboto_700Bold";
color: ${props => props.color ? props.color : "#333"};
padding-left: 5px
`;