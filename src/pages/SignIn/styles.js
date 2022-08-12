import styled from 'styled-components/native';

export const Background = styled.View`
 flex:1;
 background-color: #009DE0;
 padding: 0px 20px
 `;
export const Container = styled.KeyboardAvoidingView`
 flex:1;
 align-items: center;
 justify-content: center;
 `;
export const Logo = styled.Image`
 margin-bottom: 80px;
 `;
export const AreaInput = styled.View`
flex-direction: row;
align-items: center;
width: 100%;
 background: #ddd;
 margin-bottom: 10px;
 border-radius: 6px;
 padding: 5px 10px;
 `;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#555'
})`
 background: #ddd;
 font-size: 18px;
 color: #555;
 padding: 8px;
 width: 90%;
 `;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #EB6909;
    width: 100%;
    height: 50px;
    border-radius: 7px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    font-size: 20px;
    color: #fff;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 5px;
    margin-bottom: 9px;
`;