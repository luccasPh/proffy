import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import {
  Container,
  PlaceholderText,
  TextInput,
  Icon,
  HiddenButton,
} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  type: string;
  placeholder: string;
  security?: boolean;
  containerStyle?: {};
}

interface InputValueProps {
  value: string;
}

interface InputRefProps {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRefProps, InputProps> = (
  { name, type, placeholder, security, containerStyle = {}, ...rest },
  ref,
) => {
  const inputRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueProps>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [securityText, setSecurityText] = useState(security);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(!!inputValueRef.current.value);
  }, []);

  const handleShowPassword = useCallback(() => {
    setSecurityText(!securityText);
  }, [securityText]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

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
      <TextInput
        ref={inputRef}
        secureTextEntry={securityText}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      <PlaceholderText isFocused={isFocused} isError={!!error}>
        {error || placeholder}
      </PlaceholderText>
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

export default forwardRef(Input);
