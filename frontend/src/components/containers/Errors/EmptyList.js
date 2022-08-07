import React, { Suspense, lazy } from 'react'
import { Box, Text, Center, Heading } from '@chakra-ui/react'

const MealIllustration = lazy(() => import('../../../assets/MealIllustration'))
const FoodIllustration = lazy(() => import('../../../assets/FoodIllustration'))

function EmptyList({ isMeal }) {
  return (
    <Center align='center' mt={10}>
      <Suspense>
        <Box>
            {
                isMeal
                ?   <MealIllustration width={'100%'} />
                :   <FoodIllustration width={'100%'} />
            }

            <Heading size ='md' mt={3}>No items were found</Heading>
            <Text>
            {
                isMeal
                ?   'Start by creating a meal!'
                :   'Start by creating a food when creating a meal!'
            }
            </Text>
        </Box>
      </Suspense>
    </Center>
  )
}

export default EmptyList