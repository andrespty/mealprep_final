import React from 'react'
import { Box, Flex, Text, Spacer, Badge } from '@chakra-ui/react'

function MealDisplay({ meal }) {

    const { name, calories, recipe, ingredients } = meal

    return (
        <>
            <Box>
                
                <Badge colorScheme={'orange'}>
                    {ingredients} Ingredients
                </Badge>

                <Box>
                    <Flex>
                        <Text fontWeight={'bold'}>
                            {name}
                        </Text>
                        <Spacer/>
                        <Text fontWeight={'semibold'}>
                            {calories.toFixed(0)}
                        </Text>
                    </Flex>
                    
                    <Text as='i'>
                        {recipe.join(', ')}
                    </Text>

                </Box>

            </Box>
        </>
    )
}

export default MealDisplay