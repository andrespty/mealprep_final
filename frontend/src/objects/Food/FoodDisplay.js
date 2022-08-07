import React from 'react'
import { Box, Heading, Text, Flex, Spacer } from '@chakra-ui/react'

function FoodDisplay({ food }) {
  // console.log(food)

  const { name, description, calories, serving, serving_unit, number_of_servings } = food
    
  return (
    <Flex direction={'row'} alignItems='center' >

      <Box>

        <Heading size='md'>
          {name}
        </Heading>
        <Text>
          {description}
        </Text>

      </Box>

      <Spacer />
      
      <Box textAlign={'right'}>

        <Text fontWeight={'bold'} >
          {calories.toFixed(0)}
        </Text>
        <Text>
          {serving * number_of_servings } {serving_unit}
        </Text>

      </Box>
    
    </Flex>
  )
}

export default FoodDisplay