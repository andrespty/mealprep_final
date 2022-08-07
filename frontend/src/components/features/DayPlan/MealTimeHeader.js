import React from 'react'
import { Flex, Spacer, Heading, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

function MealTimeHeader({ label, cals, size='md', ...props }) {
  return (
    <Flex alignItems='center' {...props} >
        <Heading size={size} alignItems='center'>{label}<ChevronRightIcon /></Heading>

        <Spacer />
        <Text
          fontWeight={'semibold'}
        >
          {cals.toFixed(0)} Cals
        </Text>
    </Flex>
  )
}

export default MealTimeHeader