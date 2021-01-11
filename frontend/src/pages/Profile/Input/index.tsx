import React, {
  useState,
  useRef,
  InputHTMLAttributes,
  useEffect,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string;
  display?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  display = 'flex',
  label = 'none',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleShowPassword = useCallback(() => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }, [inputType]);

  return (
    <Container display={display}>
      <label htmlFor={name}>{label}</label>
      <div className="show-password">
        <input
          type={inputType}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {type === 'password' && (
          <i onClick={handleShowPassword}>
            {inputType === 'password' ? (
              <FiEye size={20} />
            ) : (
              <FiEyeOff size={20} style={{ color: '#8257E5' }} />
            )}
          </i>
        )}
      </div>
    </Container>
  );
};

export default Input;
