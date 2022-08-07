import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useMealTimeDetails } from './useMealTimeDetails'
import MacrosDisplay from '../../MacrosDisplay'

function MealTimeDetails({ mealTime, isIndividual=true }) {

    const { calories, macros } = useMealTimeDetails(isIndividual, mealTime)

    return (
        <Box>
            <Heading>{mealTime}</Heading>

            <Heading as='h4' size='md' mb={2} textAlign='center' >
                {calories.toFixed(0)} Calories
            </Heading>
            <MacrosDisplay {...macros} />
        </Box>
    )
}

export default MealTimeDetails