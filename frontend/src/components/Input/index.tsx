import React, {
  useState,
  useCallback,
  useRef,
  InputHTMLAttributes,
  useEffect,
} from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label: string;
  position?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  position = 'single',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(!!inputRef.current?.value);
  }, []);

  const handleShowPassword = useCallback(() => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }, [inputType]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} Position={position}>
      <input
        type={inputType}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      {type === 'password' && (
        <i onClick={handleShowPassword}>
          {inputType === 'password' ? (
            <FiEye size={20} />
          ) : (
            <FiEyeOff size={20} style={{ color: '#8257E5' }} />
          )}
        </i>
      )}
    </Container>
  );
};

export default Input;
