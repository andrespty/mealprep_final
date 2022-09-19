import React from 'react'
import { Center, Stack, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import LoginIllustration from '../../../assets/LoginIllustration'

function PleaseLogin() {

    const navigate = useNavigate()
    const login= () => navigate('/login')
    const signup= () => navigate('/signup')
    
    return (
        <Center h='50vh'>
            <Stack justifyContent={'center'} alignItems='center'>
                <LoginIllustration width={'100%'}/>
                <Text>Please Log In</Text>
                <Stack direction={'row'}>
                    <Button colorScheme={'orange'} onClick={signup}> Sign up </Button>
                    <Button colorScheme={'orange'} variant='outline' onClick={login}> Log In </Button>
                </Stack>
            </Stack>
        </Center>
    )
}

export default PleaseLogin