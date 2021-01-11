import styled from 'styled-components/native';

interface LabelProps {
  isError: boolean;
}

export const Container = styled.View`
  background: #fafafc;
  padding: 0 0 0 10px;
  height: 56px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-around;
`;

export const Label = styled.Text<LabelProps>`
  color: ${(props) => (props.isError ? '#E83F5B' : '#9c98a6')};
  font-family: 'Poppins_400Regular';
  margin-top: -30px;
  margin-left: -10px;
`;
