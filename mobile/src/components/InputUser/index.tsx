import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';

import { Container, Label, TextInput, Icon, HiddenButton } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  type: string;
  label?: string;
  security?: boolean;
  containerStyle?: {};
}

interface InputValueProps {
  value: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  label = '',
  security,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueProps>({ value: defaultValue });

  const [securityText, setSecurityText] = useState(security);

  const handleShowPassword = useCallback(() => {
    setSecurityText(!securityText);
  }, [securityText]);

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
        multiline={name === 'bio'}
        numberOfLines={14}
        secureTextEntry={securityText}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {type === 'password' && (
        <HiddenButton onPress={handleShowPassword}>
          {securityText ? (
            <Icon name="eye" size={20} color="#8257E5" />
          ) : (
            <Icon
              name="eye-off"
              size={20}
              style={{ opacity: 0.7 }}
              color="#8257E5"
            />
          )}
        </HiddenButton>
      )}
    </Container>
  );
};

export default Input;
