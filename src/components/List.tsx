import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

//CSS
const StyledMain = styled.main`
    position: relative;
    height: 100vh;
    width: 100%;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`
const StyledLogo = styled.img`
    max-width: 100%;
    @media(max-width: 550px) {
        width: 220px;
    }
    @media(max-width: 350px) {
        width: 200px;
    }
`
const StyledSection = styled.section`
    height: 70vh;
    margin: 0 auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 30px;
    }
    &::-webkit-scrollbar-thumb {
        background: url('./pokeball.png') no-repeat center bottom;
        background-size: 30px;
        display: block;
        height: 30px;
    }
    @media(max-width: 768px) {
        &::-webkit-scrollbar {
            width: 30px;
        }
        &::-webkit-scrollbar-thumb {
            background-size: 30px;
        }
    }
`
const StyledUl = styled.ul`
    max-width: 1280px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 0px;
    margin: 0 auto;
    @media(max-width: 1309px) {
        max-width: 960px;
    }
    @media(max-width: 989px) {
        max-width: 640px;
    }
    @media(max-width: 768px) {
        max-width: 440px;
    }
    @media(max-width: 550px) {
        max-width: 320px;
    }
    @media(max-width: 350px) {
        max-width: 280px;
    }
`
const StyledLi = styled.li`
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    background: #fff;
    margin: 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s ease-out;
    &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    @media(max-width: 768px) {
        width: 200px;
    }
    @media(max-width: 550px) {
        height: 170px;
        width: 140px;
    }
    @media(max-width: 350px) {
        height: 170px;
        width: 120px;
    }
`
const StyledImg = styled.img`
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 200px;
    height: auto;
    @media(max-width: 768px) {
        width: 150px;
    }
    @media(max-width: 550px) {
        width: 100px;
    }
`
const StyledPokeImg = styled.img`
    width: 200px;
    height: auto;
    @media(max-width: 768px) {
        width: 150px;
    }
    @media(max-width: 550px) {
        width: 100px;
    }
    @media(max-width: 350px) {
        width: 90px;
    }
`
const StyledP = styled.p`
    font-size: 26px;
    margin: 0px;
    line-height: 27px;
    text-transform: capitalize;
    @media(max-width: 550px) {
        font-size: 18px;
    }
    @media(max-width: 350px) {
        font-size: 15px;
    }
`
const StyledReactLink = styled(Link)`
    color: #000;
    text-decoration: none;
`
const StyledLoadMore = styled.p`
    font-size: 1.3rem;
    line-height: 1.2;
    padding: 40px 0px;
    text-align: center;
`
const StyledError = styled.p`
   font-size: 16px;
   padding: 0px 20px;
`

//TypeScript
type IPokedexProps = {
    props: {
        results?: [] | undefined
    }
}
type IProps = {
    name: string,
    url: string
}
type IPokemonProps = {
    sprites?: {
        front_default: string
    }
}

const List: FC<IPokedexProps> = ({props}) => {

    const [limit, setLimit] = useState<number>(12)
    const { results } = props
    const sliceResults = results?.slice(0, limit)
    const [pokemonImage, setPokemonImage] = useState<IPokemonProps>({})
    const [pokemonName, setPokemonName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [loadMoreItems, setLoadMoreItems] = useState<boolean>(false)
    const [error, setError] = useState<{ code: number | null, status: boolean | null }>({
        code: null,
        status: null
    })

    console.log('pokemonImage', pokemonImage)
    console.log('pokemonName', pokemonName)
    
    const loadMore = (e: React.UIEvent<HTMLUListElement>): void => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
        if (scrollHeight - scrollTop === clientHeight) {
            setLimit(limit + 10)
            setLoadMoreItems(true)
        }
        else {
            setLoadMoreItems(false)
        }
        if (sliceResults?.length === results?.length) {
            setLimit(limit)
            setLoadMoreItems(false)
        }
    }

    //single pokemon image
    useEffect(() => {
        setLoading(true)
        //const name = () => {
            sliceResults && sliceResults.map((pokemon: IProps) => {
                const pokeName: string = pokemon.name
                setPokemonName(pokeName)
                //return pokeName
            })
        //}
        axios.get<IPokemonProps>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then( res => {
                if (res.status < 300) {
                    setLoading(false)
                    setPokemonImage(res.data)
                    setError({
                        code: res.status,
                        status: false
                    })
                    setLoadMoreItems(true)
                }
                console.log('resPokeName', res)
            })
            .catch(err => {
                if (err.response && err.response.status > 300) {
                    setLoading(false)
                    setError({
                        code: err.response.status,
                        status: true
                    })
                    setLoadMoreItems(false)
                }
                console.log('err', err.response)
            })
    }, [])

    return (
        <StyledMain>
            <StyledLogo alt="pokeApi" src="./pokelogo.png" />
            <StyledSection onScroll={loadMore}>
                {   loading  ? 
                    <StyledImg src={`./pokeball.png`} />
                :   error?.code && error?.code > 300 ?
                    <StyledError><b>{error?.code}</b>. That's an error.<br></br>The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.</StyledError>
                :
                    <React.Fragment>
                        <StyledUl>
                            {sliceResults && sliceResults.map((pokemon: IProps, idx: number) => (
                                <StyledReactLink to={`/${pokemon.name}`} key={idx}>
                                    <StyledLi>
                                        {/* <StyledImg alt={pokemon.name} src={pokemonImage?.sprites?.front_default || `./ pokeball.png`} /> */}
                                        <StyledPokeImg alt={pokemon.name} src={`./pokeball.png`} />
                                        <StyledP>{pokemon.name}</StyledP>
                                    </StyledLi>
                                </StyledReactLink>
                            ))}
                        </StyledUl>
                    </React.Fragment>
                }
                <StyledLoadMore>
                    {   loadMoreItems === true && sliceResults?.length !== results?.length && error?.code && error?.code < 300 ?
                        'loading...'
                    :   loadMoreItems === false && sliceResults?.length === results?.length && loading === false ?
                        'no more pokemons found'
                    :
                        ''
                    }
                </StyledLoadMore>
            </StyledSection>
        </StyledMain>
    )

}
export default List