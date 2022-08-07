import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

function ModalContainer({ header='', body:Body, isOpen, onClose, footer:Footer, ...props }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} >
        <ModalOverlay/> 
        <ModalContent>
        
            <ModalHeader>{ header }</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              {
                React.isValidElement(Body)
                ?   React.cloneElement(Body, {onClose})
                :   null
              }
            </ModalBody>

            <ModalFooter>
              {
                React.isValidElement(Footer)
                ?   React.cloneElement(Footer)
                :   null
              }
            </ModalFooter>

        </ModalContent>
    </Modal>
  )
}

export default ModalContainer