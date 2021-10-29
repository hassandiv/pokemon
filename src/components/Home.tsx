import React, { useState, useEffect } from 'react'
import List from './List'
import axios from 'axios'

type IPokedex = {
    results?: [] | undefined,
}

const Home = () => {

    const [pokedex, setPokdex] = useState<IPokedex>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<{ code: number | null, status: boolean | null }>({
        code: null,
        status: null
    })
    
    useEffect(() => {
        setLoading(true)
        axios.get<IPokedex>(`https://pokeapi.co/api/v2/pokemon?&limit=151`)
            .then( res => {
                if (res.status < 300) {
                    setLoading(false)
                    setPokdex(res.data)
                    setError({
                        code: res.status,
                        status: false
                    })
                }
            })
            .catch(err => {
                if (err.response && err.response.status > 300) {
                    setLoading(false)
                    setError({
                        code: err.response.status,
                        status: true
                    })
                }
            })
    }, [])

    return (
        <List
            props={pokedex}
            error={error}
            loading={loading}
        />
    )

}
export default Home