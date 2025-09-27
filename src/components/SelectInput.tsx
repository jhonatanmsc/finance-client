import React, { useEffect, useRef, useState } from 'react'
import Select, { Props as ReactSelectProps } from 'react-select'
import makeAnimated from 'react-select/animated'
import { CFormLabel } from '@coreui/react'

type Option = { value: string; label: string }

interface CustomProps<OptionType, IsMulti extends boolean = false>
  extends Omit<ReactSelectProps<OptionType, IsMulti>, 'options'> {
  options: OptionType[]
  label?: string
}

export default function SelectInput({ label, options, ...props }: CustomProps<any>) {
  const customInputRef = useRef(null)
  const [customId, setCustomId] = useState('')
  const animatedComponents = makeAnimated()

  useEffect(() => {
    if (customInputRef.current) {
      // @ts-ignore
      const input = customInputRef.current.querySelector('input')
      if (input?.id) {
        setCustomId(input.id)
      }
    }
  })

  return (
    <div>
      <CFormLabel htmlFor={customId} className="me-3">
        {label}
      </CFormLabel>
      <div ref={customInputRef}>
        <Select
          components={animatedComponents}
          {...props}
          options={options}
          value={props.value}
          onChange={props.onChange}
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
            multiValue: (base) => ({
              ...base,
              backgroundColor: 'rgba(255,255,255,0.1)', // cor de fundo no dark mode
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'var(--cui-body-color)', // texto das tags
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'var(--cui-body-color)',
              ':hover': { backgroundColor: 'rgba(255,255,255,0.2)', color: 'red' },
            }),
          }}
        />
      </div>
    </div>
  )
}
