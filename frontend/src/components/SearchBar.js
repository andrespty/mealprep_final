import React from 'react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/input'
import { SearchIcon } from '@chakra-ui/icons'

function SearchBar({placeholder, onChange}) {
  return (
    <InputGroup>
            
        <InputLeftElement children={<SearchIcon />} />
        <Input placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />

    </InputGroup>
  )
}

export default SearchBar