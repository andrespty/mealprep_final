import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from '@chakra-ui/icons'

const RemoveList = ({list, resourceName, onRemove, itemComponent: ItemComponent, ...props}) => {
    return (
        <>
            {
                list.map((item, key) => (
                    <Flex
                        key={key}
                        alignItems='center'
                        gap={1}
                    >
                        <Box  >
                            <IconButton 
                                icon={<CloseIcon />}
                                colorScheme='red'
                                size='sm'
                                onClick={() => onRemove(item)}
                            />
                        </Box>
                        <Box flex={1}>
                            <ItemComponent {...{[resourceName]: item}} />
                        </Box>
                    </Flex>
                ))
            }
        </>
    )
}

export default RemoveList