import { Box } from "@chakra-ui/react"
export const withContainer = (Component) => {
    return props => {
        return (
            <Box m={1} p={1} px={2} border='1px solid #CBD5E0' borderRadius={'0.375rem'} cursor={'pointer'}>
                <Component {...props} />
            </Box>
        )
    }
}