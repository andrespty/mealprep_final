import { Box } from '@chakra-ui/react'
import React from 'react'

function RegularList({ 
    list, 
    resourceName, 
    onClickItem = () => {}, 
    itemComponent: ItemComponent, 
    ...props 
}) {
    return (
        <>
            {
                list.map((item, key) => (
                    <Box
                        box={Box}
                        onClick={() => onClickItem(item)} 
                        key={key}
                        {...props}
                    >
                        <ItemComponent {...{ [resourceName]: item }}/>
                    </Box>
                ))
            }   
        </>
    )
}

export default RegularList