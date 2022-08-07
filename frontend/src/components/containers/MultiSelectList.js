import React from 'react';
import { Skeleton, Checkbox, Flex, CheckboxGroup, Box } from '@chakra-ui/react';

function MultiSelectList({ 
    items, 
    resourceName, 
    onClickItem, 
    isLoading,
    onChange,
    selectedValues = [],
    itemComponent:ItemComponent 
}) {
    
    const handle_click = (_id) => {
        onChange([...selectedValues, _id])
    }

    const handle_checkbox_group = (list) => {
        onChange(list)
    }

    return (
        <>
            <Skeleton isLoaded={!isLoading} >
                <CheckboxGroup 
                    onChange={handle_checkbox_group} 
                    value={selectedValues} 
                    colorScheme={'orange'} 
                >
                {
                    items.map((item, key) => (
                        <Flex
                            direction={'row'}
                            key={key}
                            cursor='pointer'
                            alignItems={'center'}
                            // onClick={() => handle_click(item._id)}
                            p={1}
                            border='1px'
                            borderColor={'#CBD5E0'}
                            borderRadius={'0.375rem'}
                            mt={1}
                        >
                            <Box mr={3} >
                                <Checkbox value={item._id} />
                            </Box>
                            <Box flex={1}>
                                <ItemComponent {...{ [resourceName]: item }} /> 
                            </Box>
                        </Flex>
                    ))
                }
                </CheckboxGroup>
            </Skeleton>
        </>
    )
}

export default MultiSelectList;
