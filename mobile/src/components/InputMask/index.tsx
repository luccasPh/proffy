import React, { useRef, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import { MaskService } from 'react-native-masked-text';

import { Container, Label, TextInput } from './styles';

interface InputProps {
  name: string;
  type: string;
  label: string;
  options?: {};
  containerStyle?: {};
}

interface InputValueProps {
  value: string;
}

const InputMask: React.FC<InputProps> = ({
  name,
  type,
  label,
  options = {},
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueProps>({ value: defaultValue });

  const handleMask = useCallback(
    (value: string) => {
      return MaskService.toMask(type, value, options);
    },
    [options, type],
  );

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      <Label isError={!!error}>{error || label}</Label>
      <TextInput
        ref={inputRef}
        keyboardType="numeric"
        defaultValue={handleMask(defaultValue)}
        onChangeText={(value) => {
          const formatted = handleMask(value);
          inputRef.current.setNativeProps({ text: formatted });
          inputValueRef.current.value = formatted;
        }}
        {...rest}
      />
    </Container>
  );
};

export default InputMask;
