import React, { useEffect, useState } from 'react'
import { Select, TYPE } from 'baseui/select'
import { Scryfall, getCardByName } from 'scryfall'

export interface CommanderSelectT {
  onChange?: Function
}
export const CommanderSelect = (props: CommanderSelectT) => {
  const { onChange } = props
  const [value, setValue] = useState<any[]>([])
  const [cardValues, setCardValues] = useState<any>([])
  const [input, setInput] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const handleChange = (values: any[]) => {
    setValue(values)
  }
  useEffect(() => {
    setCardValues([])
    value.forEach((co) => {
      getCardByName(co.name, false, (err, card) => {
        if (!err) {
          setCardValues((cvs: any[]) => [
            ...cvs.filter((c) => c.name !== co.name),
            card,
          ])
        }
      })
    })
  }, [JSON.stringify(value)])
  useEffect(() => {
    if (onChange) onChange(cardValues)
  }, [JSON.stringify(cardValues)])
  useEffect(() => {
    Scryfall.autocomplete(input, (matches) => setOptions(matches))
  }, [input])

  return (
    <Select
      multi
      type={TYPE.search}
      escapeClearsValue={false}
      options={options.map((o) => ({ name: o, id: o }))}
      value={value}
      onBlurResetsInput={false}
      placeholder='Select Commander'
      onChange={(params: any) => handleChange(params.value)}
      onInputChange={(event: any) => setInput(event.target.value)}
      maxDropdownHeight='200px'
      labelKey='name'
    />
  )
}
