import { useDrag } from 'react-dnd'
import { ItemTypes } from './Items'
import { Box, Flex } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'

export const withDrag = (Component) => {
    return props => {
        // console.log(props.meal)
        const [{isDragging}, drag] = useDrag(() => ({
            type: ItemTypes.MEAL,
            item: {
                success: true,
                data: props.meal
            },
            collect: monitor => ({
              isDragging: monitor.isDragging(),
            }),
          }))

        return  <Box 
                    ref={drag} 
                    style={{opacity: isDragging ? 0.5 : 1,}}
                >
                    <Flex alignItems={'center'}>
                        <Box mr={2}>
                            <DragHandleIcon cursor='move' />
                        </Box>
                        <Box w='100%'>
                            <Component {...props} />
                        </Box>
                    </Flex>
                </Box>
    }
}

export default withDrag