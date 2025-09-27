import React from 'react'
import Select, { Props as ReactSelectProps } from 'react-select'
import makeAnimated from 'react-select/animated'

type Option = { value: string; label: string }

interface CustomProps extends Partial<ReactSelectProps<Option, false>> {
  options: Option[] | undefined
  value: any
  onChange: ((vl: any) => void) | undefined
}

export default function SelectInput({ options, value, onChange, ...props }: CustomProps) {
  const animatedComponents = makeAnimated()

  return (
    <Select
      components={animatedComponents}
      {...props}
      options={options}
      value={value}
      onChange={onChange}
      className="form-control p-0" // aplica a classe do Bootstrap
      classNamePrefix="react-select" // garante prefixo nas classes internas
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'var(--cui-body-bg)', // pega cor do Bootstrap (muda no dark mode)
          color: 'var(--cui-body-color)',
          borderColor: 'var(--cui-body-bg)',
          minHeight: 'calc(1.5em + .75rem + 2px)', // altura padrão do form-control
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'var(--cui-border-color)',
          },
          // importante: respeitar o modo escuro/claro do navegador
          colorScheme: 'light dark',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'var(--cui-body-bg)',
          color: 'var(--cui-body-color)',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? 'var(--cui-secondary-bg)' : 'transparent',
          color: 'var(--cui-body-color)',
        }),
        singleValue: (base) => ({
          ...base,
          color: 'var(--cui-body-color)',
        }),
        input: (base) => ({
          ...base,
          color: 'var(--cui-body-color)',
        }),
      }}
    />
  )
}
