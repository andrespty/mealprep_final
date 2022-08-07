import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

function SplitScreen({ 
        children, 
        containerProps,
        leftProps,
        rightProps
    }) {
    const [ left, right ] = children
    return (
        <Grid {...containerProps} templateColumns='repeat(2, 1fr)' gridRow={'1fr'} overflow='auto'>
            <GridItem colSpan={{base:2, md:1}} {...leftProps}>
                {left}
            </GridItem>
            <GridItem 
                colSpan={{base:0, md:1}} {...rightProps} 
                display='flex' 
                flexDir={'column'} 
            >
                {right}
            </GridItem>
        </Grid>
    )
}

export default SplitScreen