import React from 'react'
import { Spinner, Center, Box } from '@chakra-ui/react'

function WaitLoading({ isLoading, children }) {
  return (
    <Box>
        {
            isLoading
            ?   <Center>
                    <Spinner />
                </Center>
            :   <React.Fragment>
                    {children}
                </React.Fragment>
        }
    </Box>
  )
}

export default WaitLoading