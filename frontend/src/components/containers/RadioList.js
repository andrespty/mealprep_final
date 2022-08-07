import { Box, Radio, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

function RadioList({ 
    list, 
    resourceName, 
    onClickItem = () => {}, 
    itemComponent: ItemComponent, 
    emptyListComponent: EmptyListComponent,
    emptyListProps,
    value,
    ...props 
}) {

    const [ checked, setChecked ] = useState('')

    const handle_check = (val) => {
        if (val === checked){
            setChecked('')
            onClickItem('')
        }
        else{
            setChecked(val)
            onClickItem(val)
        }
    }

    return (
        <>
            {
                list.length === 0
                ?   <EmptyListComponent {...emptyListProps} />
                :
                list.map((item, key) => (
                    <Flex 
                        key={key} 
                        cursor={'pointer'} 
                        gap={3}
                        {...props} 
                    >

                        <Radio isChecked={item._id === checked} onClick={() => handle_check(item._id)} />
                        <Box flex={1} onClick={() => handle_check(item._id)} > 
                            <ItemComponent {...{ [resourceName]: item }}/>
                        </Box>
                    </Flex>
                ))
            }   
        </>
    )
}

export default RadioList