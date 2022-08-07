import React from 'react'
import { FormControl, FormLabel } from '@chakra-ui/react'

function FormField({ children, label, ...props}) {
  return (
    <FormControl {...props}>
        <FormLabel my={0}>{label}</FormLabel>
        {children}
    </FormControl>
  )
}

export default FormField