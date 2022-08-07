import React, { useState } from 'react'
import { Box, Heading, Center, Text, Link as SLink, Button, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'
import FormField from '../components/FormField'
import axios from 'axios'
import { fetch_url } from '../App'
import { useNavigate } from 'react-router-dom'
import withUserActions from '../Redux/containers/user/withUserActions'

function LogInSignUp({ isLogIn, logIn }) {

    const [ info, setInfo ] = useState(initial_state(isLogIn))
    let navigate = useNavigate()

    const modify = data => setInfo(prev => ({...prev, info:{...prev.info, ...data}}))
    const setError = data => setInfo(prev => ({...prev, error: {...prev.error, ...data}}))
    const setLoading = data => setInfo(prev => ({...prev, isLoading: data}))

    const submit = (e) => {
        e.preventDefault()
        setError(initial_error)
        let error;
        if (!isLogIn){
            error = check_passwords(info.info.password, info.info.password2)
            if (error.hasError){
                setError({...error.fields, message: error.message})
                return
            }
        }

        setLoading(true)
        let fetch = isLogIn ? `${fetch_url}/users/login/` : `${fetch_url}/users/signup/`
        axios.post(fetch, info.info)
        .then(res => res.data)
        .then(json => {
            if (json.success){
                logIn({
                    user:{...json.user}, 
                    status:{isLoggedIn:true},
                    token: json.token
                })
                navigate('/')
            }
            else{
                setError({message: json.message, email:true, password: true})
                setLoading(false)
            }
        })
        .catch(e => setError({message: 'Something went wrong'}))


    }

    return (
        <>
            <Center mt={2}>
                <Notification isOpen={info.error.message !== ''} message={info.error.message} status='error' />
            </Center>

            <Center>
                <Box w={{base:'90%', md:'60%'}} mt={10} >

                    <Heading align='center'>
                        {isLogIn ? 'Log In' : 'Sign Up'}
                    </Heading>

                    <Box>

                        <form onSubmit={submit}>

                            {
                                isLogIn
                                ?   null
                                :   <>
                                        <FormField isRequired={true} label='First name' mt={3} >
                                            <Input value={info.first_name} placeholder='John' onChange={e => modify({first_name: e.target.value})}  />
                                        </FormField>
                                        <FormField isRequired={true} label='Last name' mt={3} >
                                            <Input value={info.last_name} placeholder='Doe'  onChange={e => modify({last_name: e.target.value})}/>
                                        </FormField>
                                    </>
                            }

                            <FormField isRequired={true} label='Email' mt={3} >
                                <Input value={info.email} placeholder='Email' onChange={e => modify({email: e.target.value})} />
                            </FormField>
                            
                            <FormField isRequired={true} label='Password'  mt={3}>
                                <Input value={info.password} placeholder='Password' type='password' onChange={e => modify({password: e.target.value})}/>
                            </FormField>

                            {
                                isLogIn
                                ?   null
                                :   <FormField isRequired={true} label='Confirm Password'  mt={3}>
                                        <Input value={info.password2} placeholder='Password' type='password' onChange={e => modify({password2: e.target.value})}/>
                                    </FormField>
                            }

                            <Center>
                                <Button type='submit' isLoading={info.isLoading}  mt={3}  w='50%' variant='solid' colorScheme={'orange'} >
                                    Log In
                                </Button>
                            </Center>

                        </form>

                    </Box>

                    {
                        isLogIn
                        ?   <Text align='center'>Don't have an account? <SLink as={Link} to='/signup'>Sign Up </SLink>here!</Text>
                        :   <Text align='center'>Already have an account? <SLink as={Link} to='/login'>Log In </SLink>here!</Text>
                    }
                    
                </Box>
            </Center>
        </>
    )
}

export default withUserActions(LogInSignUp)

const initial_log_in = {
    email:'',
    password:''
}
const initial_sign_up = {
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    password:'',
    password2:''
}
const initial_error = {
    message:'',
    username:false,
    email:false,
    password:false
}
const initial_state = (isLogIn) => ({
    isLoading: false,
    error: initial_error,
    info: isLogIn ? initial_log_in : initial_sign_up
})

const check_passwords = (pass1, pass2) => {

    if (!password_format(pass1)){
        return { 
            hasError: true, 
            message: 'Password must be between 6 - 20 characters long, and contain at least one numeric digit and one non-numeric digit.',
            fields: {
                password: true
            }
        }
    }
    if (!passwords_same(pass1, pass2)){
        return {
            hasError: true, 
            message: 'Passwords must match',
            fields: {
                password: true,
                password2: true
            }
        }
    }

    return {hasError:false}
}

const password_format = (inputtxt) => {
    var passw = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    if(inputtxt.match(passw)) { 
        return true;
    }
    else{ 
        return false;
    }
}

const passwords_same = (p1, p2) => {
    return p1 === p2
} 