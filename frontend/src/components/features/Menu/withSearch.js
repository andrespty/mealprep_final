import SearchBar from "../../SearchBar"
import { useState, useEffect } from "react"

export const withSearch = (Component) => {
    return props => {

        const og_list = props.list
        const [ list, setList ] = useState(og_list)

        const search = (str) => {
            setList(og_list.filter(item => item.name.toLowerCase().includes(str.toLowerCase())))
        }

        useEffect(() => {   
            setList(og_list)
        }, [og_list])
        

        return <>
            <SearchBar placeholder={'Search by name'} onChange={search} />
            <Component {...props} list={list} />
        </>
    }
}