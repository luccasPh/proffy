import React, { useRef, useEffect } from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  style?: object;
}

const SelectArea: React.FC<Props> = ({ label, name, style = {}, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container style={style}>
      <label htmlFor={name}>{label}</label>
      <Select
        className="select"
        classNamePrefix="content"
        defaultInputValue={defaultValue}
        ref={selectRef}
        {...rest}
      />
    </Container>
  );
};

export default SelectArea;
