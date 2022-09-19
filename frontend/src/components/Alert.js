import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

function Alert({ header, body, isOpen, onClose, action, cta='Continue'}) {
  return (
    <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
    >
        <AlertDialogOverlay>
        <AlertDialogContent>

            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {header}
            </AlertDialogHeader>

            <AlertDialogBody>
                {body}
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='orange' onClick={action} ml={3}>
                    {cta}
                </Button>
            </AlertDialogFooter>

        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>

  )
}

export default Alert