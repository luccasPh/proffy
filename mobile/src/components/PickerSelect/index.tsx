import React, { useRef, useEffect } from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { useField } from '@unform/core';

import { Container, Label } from './styles';

interface PickerProps extends PickerSelectProps {
  name: string;
  label: string;
  placeholder: string;
  containerStyle?: {};
}

const PickerSelect: React.FC<PickerProps> = ({
  name,
  label,
  placeholder,
  containerStyle = {},
  ...rest
}) => {
  const pickerRef = useRef<any>(null);
  const { registerField, fieldName, error } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      getValue() {
        return pickerRef.current.state.selectedItem.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container style={containerStyle}>
        <Label isError={!!error}>{error || label}</Label>
        <RNPickerSelect
          ref={pickerRef}
          placeholder={{
            label: placeholder,
            value: null,
            color: '#C1BCCC',
          }}
          style={{
            inputAndroid: {
              fontSize: 16,
              fontFamily: 'Poppins_400Regular',
              color: '#6a6180',
              marginTop: 10,
            },
          }}
          {...rest}
        />
      </Container>
    </>
  );
};

export default PickerSelect;
