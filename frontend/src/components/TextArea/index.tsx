import React, { useRef, TextareaHTMLAttributes, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, ...rest }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label>
        Biografia <span>(Máximo 300 caracteres)</span>
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        maxLength={300}
        ref={textAreaRef}
        {...rest}
      />
    </Container>
  );
};

export default TextArea;
