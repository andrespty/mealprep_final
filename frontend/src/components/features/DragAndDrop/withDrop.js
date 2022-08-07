import { useDrop } from 'react-dnd'
import { ItemTypes } from './Items'
import { Box } from '@chakra-ui/react'

export const withDrop = (Component) => {
    return props => {

        let { onDrop } = props

        const  [{ isOver }, drop] = useDrop(() => ({
            accept: ItemTypes.MEAL,
            // drop: props.onDrop,
            drop: (item) => {
                onDrop(item)
            },
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            })
        }))

        return  <Box 
                    ref={drop}
                    opacity={isOver ? 0.5 : 1}
                    bg={isOver ? 'orange.100' : ''}
                >
                    <Component {...props} />
                </Box>
    }
}

export default withDrop