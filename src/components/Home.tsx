import React, { useState, useEffect } from 'react'
import List from './List'
import axios from 'axios'

type IPokedex = {
    results?: [] | undefined,
}

const Home = () => {

    const [pokedex, setPokdex] = useState<IPokedex>({})
    const [error, setError] = useState<{ code: number | null, status: boolean | null }>({
        code: null,
        status: null
    })
    
    useEffect(() => {
        axios.get<IPokedex>(`https://pokeapi.co/api/v2/pokemon?&limit=151`)
            .then( res => {
                if (res.status < 300) {
                    setPokdex(res.data)
                    setError({
                        code: res.status,
                        status: false
                    })
                }
                console.log('res', res)
            })
            .catch(err => {
                if (err.response && err.response.status > 300) {
                    setError({
                        code: err.response.status,
                        status: true
                    })
                }
                console.log('err', err.response)
            })
    }, [])

    return (
        <List props={pokedex} />
    )

}
export default Home