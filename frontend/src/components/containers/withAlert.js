import Alert from "../Alert"
import { useDisclosure } from "@chakra-ui/react"

export const withAlert = (Component) => {
    return props => {

        const { header, body, action, cta} = props
        const { isOpen, onClose, onOpen } = useDisclosure()

        return <>
                <Component onClick={onOpen} {...props} />
                <Alert 
                    header={header}
                    isOpen={isOpen}
                    onClose={onClose}
                    body={body}
                    action={action}
                    cta={cta}
                />
            </>
    }
}