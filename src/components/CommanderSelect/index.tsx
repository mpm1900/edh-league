import React, { useEffect, useState } from 'react'
import { Select, TYPE } from 'baseui/select'
import { Scryfall, getCardByName } from 'scryfall'

export const CommanderSelect = () => {
  const [value, setValue] = useState([])
  const [input, setInput] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const handleChange = (value: any) => {
    setValue(value)
    console.log('VALUE', value)
    getCardByName(value[0].label, false, (err, card) =>
      console.log('CARD', card),
    )
  }
  useEffect(() => {
    Scryfall.autocomplete(input, (matches) => setOptions(matches))
  }, [input])
  console.log(value)
  return (
    <Select
      multi
      type={TYPE.search}
      escapeClearsValue={false}
      options={options.map((o) => ({ label: o, id: o }))}
      value={value}
      onBlurResetsInput={false}
      placeholder='Select Commander'
      onChange={(params: any) => handleChange(params.value)}
      onInputChange={(event: any) => setInput(event.target.value)}
      maxDropdownHeight="200px"
    />
  )
}
