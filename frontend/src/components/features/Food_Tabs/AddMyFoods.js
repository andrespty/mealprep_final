import React, { useState, useEffect } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import SearchBar from '../../SearchBar'
import MultiSelectList from '../../containers/MultiSelectList'
import FoodDataHandler from '../../../objects/Food/FoodDataHandler'

function AddMyFoods({ myFoods, selectedFoods, setSelectedFoods }) {
  
  const [ list, setList ] = useState(myFoods)

  const search = (str) => setList(myFoods.filter(item => item.name.toLowerCase().includes(str.toLowerCase())))
  const log = (ids) => setSelectedFoods(ids)

  useEffect(() => {
    console.log('My Foods Changed')
    setList(myFoods)
  }, [myFoods])
  

  return (
    <Box>

      <Heading size='md' >My Foods</Heading>

      <SearchBar placeholder='Search' onChange={search}/>

      <MultiSelectList 
        items={list}
        resourceName='food'
        selectedValues={selectedFoods}
        itemComponent={FoodDataHandler}
        onChange={log}
      />

    </Box>
  )
}

export default AddMyFoods