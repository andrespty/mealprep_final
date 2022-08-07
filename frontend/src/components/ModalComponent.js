import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

function ModalComponent({ title, body:Body, footer:Footer }) {
  return (
    <Modal>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Body />
          </ModalBody>

          <ModalFooter>
            <Footer />
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ModalComponent