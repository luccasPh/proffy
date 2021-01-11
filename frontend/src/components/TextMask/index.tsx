import React, { useRef, useEffect } from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends MaskedInputProps {
  name: string;
  type: string;
  label: string;
  labelSize?: string;
  style?: object;
}

interface RefProps extends MaskedInput {
  textMaskInputElement: {
    state: {
      previousConformedValue: string;
    };
  };
}

const TextMask: React.FC<InputProps> = ({
  name,
  type,
  label,
  style = {},
  labelSize = '',
  ...rest
}) => {
  const inputRef = useRef<RefProps>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'textMaskInputElement.state.previousConformedValue',
      setValue(ref, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style}>
      <label style={{ fontSize: labelSize }} htmlFor={name}>
        {label}
      </label>
      <MaskedInput defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};
export default TextMask;
