import React from 'react'
import { Alert, AlertIcon, AlertDescription, Fade, Center } from '@chakra-ui/react'

// error, success, warning, info in STATUS

function Notification({ isOpen, message, status }) {
    return (
        <Center position='absolute' zIndex={1} >
            <Fade in={isOpen}>
                <Alert status={status} borderRadius={5} variant='subtle'>
                    <AlertIcon />
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            </Fade>
        </Center>   
    )
}

export default Notification