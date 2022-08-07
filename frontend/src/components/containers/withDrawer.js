import React from "react";
import { DrawerFooter, useDisclosure } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton } from "@chakra-ui/react";

export const withDrawer = (Trigger) => {
    return props => {

        const { isOpen, onOpen, onClose } = useDisclosure()
        const { body: Body, header='', footer: Footer, drawerprops } = props

        const handle_open = (item) => {
            onOpen()
        }

        return  <>
                    <Trigger {...props} onClick={handle_open}  />

                    <Drawer isOpen={isOpen} onClose={onClose} {...drawerprops} >
                        <DrawerOverlay/>
                        <DrawerContent>
                            <DrawerCloseButton />

                            <DrawerHeader>{header}</DrawerHeader>

                            <DrawerBody>
                                {
                                    React.isValidElement(Body)
                                    ?   React.cloneElement(Body, {onClose})
                                    :   null
                                }
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
    }
}