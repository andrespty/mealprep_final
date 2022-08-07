import React, { useState } from 'react'
import { Box, 
    Drawer, 
    DrawerBody, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerHeader, 
    DrawerCloseButton,
    useDisclosure,
    DrawerFooter,
} from '@chakra-ui/react'

function DrawerList({ 
    list, 
    resourceName, 
    itemComponent: ItemComponent,
    emptyComponent: EmptyComponent = React.Fragment,
    body: Body,
    header='',
    footer: Footer, 
    drawerProps,
    emptyComponentProps,
    ...props 
}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ drawerItem, setDrawerItem ] = useState()

    const handle_click = (item) => {
        setDrawerItem(item)
        onOpen()
    }

    return (
        <>
            {
                list.length === 0
                ?   <EmptyComponent {...emptyComponentProps}/>
                :
                list.map((item, key) => (
                    <Box
                        box={Box}
                        onClick={() => handle_click(item)} 
                        key={key}
                        {...props}
                    >
                        <ItemComponent {...{ [resourceName]: item }}/>
                    </Box>
                ))
            }  
            <Drawer isOpen={isOpen} onClose={onClose} {...drawerProps}>

                <DrawerOverlay/>

                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerHeader>{header}</DrawerHeader>

                    <DrawerBody>
                        <Body {...props} {...{ [resourceName]: drawerItem }} onClose={onClose} />
                    </DrawerBody>

                    <DrawerFooter>
                    {
                        React.isValidElement(Footer)
                        ?   React.cloneElement(Footer)
                        :   null
                    }
                    </DrawerFooter>

                </DrawerContent>

            </Drawer> 
        </>
    )
}

export default DrawerList