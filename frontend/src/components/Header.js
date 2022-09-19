import React, { lazy, Suspense } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import { Box, Flex, Heading, Button, ButtonGroup, Spacer, Menu, MenuButton, MenuList, MenuItem, HStack, Hide, IconButton, VStack } from '@chakra-ui/react'
import withUserInfo from '../Redux/containers/user/withUserInfo'
import withUserActions from '../Redux/containers/user/withUserActions'
import WaitLoading from './containers/WaitLoading'
import { HamburgerIcon } from '@chakra-ui/icons'
import { withDrawer } from './containers/withDrawer'

const Logo = lazy(() => import('../assets/Logo'))
const IconButtonWithDrawer = withDrawer(IconButton)

function Header({ user, status, logOut }) {

    const { isLoading, isLoggedIn } = status

    let navigate = useNavigate()
    const home = () => navigate('/')
    const login = () => navigate('/login')
    const signup = () => navigate('/signup')
    const menu = () => navigate('/menu')

    const isHome = useMatch('/')
    const isMenu = useMatch('/menu')

    return (
        <Flex bg='white' boxShadow='md' p={3} borderBottomRadius={10} alignItems='center' className='sticky-inner' >
            <Suspense fallback=''>
                <Box onClick={home} cursor='pointer' >
                    <Logo />
                </Box>
                
                <Spacer />

                <Hide below='md' >
                    <WaitLoading isLoading={isLoading}>
                        {
                            isLoggedIn
                            ?   <HStack alignItems={'center'} spacing={6}>
                                    <Heading onClick={home} size='md' cursor='pointer' color={isHome ? 'orange.500': ''} >
                                        Homee
                                    </Heading>
                                    <Heading onClick={menu} size='md' cursor='pointer' color={isMenu ? 'orange.500': ''}>
                                        Menu
                                    </Heading>
                                    <Menu>
                                        <MenuButton cursor='pointer' as={Heading} size='md'>{user.first_name}</MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={logOut}>Log Out</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </HStack>

                            :   <ButtonGroup>
                                    <Button 
                                        onClick={login}
                                    >
                                        Log In
                                    </Button>
                                    <Button 
                                        onClick={signup}
                                        colorScheme='orange'
                                    >
                                        Sign Up
                                    </Button>
                                </ButtonGroup>
                        }
                    </WaitLoading>
                </Hide>
                
                <Hide above='md'>
                    <IconButtonWithDrawer 
                        variant='ghost'
                        icon={<HamburgerIcon fontSize='xl'/>}
                        body={<MobileMenu isLoggedIn={isLoggedIn} logOut={logOut} user={user} />}
                    />
                </Hide>
            </Suspense>
        </Flex>
    )
}

const MobileMenu =  ({ isLoggedIn, logOut, user,onClose }) => {
    let navigate = useNavigate()
    const home = () => navigate('/')
    const menu = () => navigate('/menu')
    const login = () => navigate('/login')
    const signup = () => navigate('/signup')

    const isHome = useMatch('/')
    const isMenu = useMatch('/menu')
    const isSignUp = useMatch('/signup')
    const isLogin = useMatch('/login')

    return (
        <>
            {
                isLoggedIn
                ?   <VStack alignItems={'left'} spacing={12} size='4xl' h={'100%'} pb={16}>
                        <Spacer />
                        <Heading onClick={()=>{home(); onClose()}} size='3xl' cursor='pointer' color={isHome ? 'orange.500': ''} >
                            Home
                        </Heading>
                        <Heading onClick={()=>{menu();onClose()}} size='3xl' cursor='pointer' color={isMenu ? 'orange.500': ''}>
                            Menu
                        </Heading>
                        <Menu>
                            <MenuButton cursor='pointer' as={Heading} size='3xl'>{user.first_name}</MenuButton>
                            <MenuList>
                                <MenuItem onClick={()=>{logOut();onClose()}}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </VStack>
                :   <VStack alignItems={'left'} spacing={8} h='100%' pb={16}>
                        <Spacer/>
                        <Heading 
                            size='3xl'
                            cursor='pointer'
                            onClick={()=>{login();onClose()}}
                            color={isLogin ? 'orange.500': ''}
                        >
                            Log In
                        </Heading>
                        <Heading 
                            size='3xl'
                            cursor='pointer'
                            onClick={()=>{signup();onClose()}}
                            color={isSignUp ? 'orange.500': ''}
                        >
                            Sign Up
                        </Heading>
                    </VStack>
            }
        </>
    )
}

export default withUserActions(withUserInfo(Header))