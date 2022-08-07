import { useDisclosure } from "@chakra-ui/react"
import ModalContainer from "./ModalContainer"

export const withModal = (Trigger) => {
    return props => {
    
        const { header, body, footer } = props

        const { isOpen, onOpen, onClose } = useDisclosure()
    
        return (
            <>
                <Trigger onClick={onOpen} {...props} />
                <ModalContainer
                    header={header}
                    body={body}
                    footer={footer}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </>
        )
    }
}