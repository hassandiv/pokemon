import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

//CSS
const StyledSection = styled.section`
    color: #ffffff;
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(to bottom right,#024,#402);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const StyledCard = styled.div`
    position: relative;
    width: 400px;
    height: 600px;
    border-radius: 20px;
    border: 1px solid #ffdd56;
    background: none;
    @media(max-width: 550px) {
        width: 350px;
        height: 550px;
    }
    @media(max-width: 380px) {
        width: 300px;
    }
    @media(max-width: 350px) {
        width: 270px;
        height: 500px;
    }
`
const StyledPokeImage = styled.img`
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 350px;
    @media(max-width: 550px) {
        width: 300px;
    }
    @media(max-width: 380px) {
        width: 250px;
    }
`
const StyledImg = styled.img`
    width: 200px;
    height: auto;
    @media(max-width: 768px) {
        width: 150px;
    }
    @media(max-width: 550px) {
        width: 100px;
    }
`
const StyledFlexPower = styled.ul`
    padding: 0px;
    margin: 0px;
`
const StyledLiType = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
    &:nth-child(2) {
        display: none;
    }
`
const StyledLiStat = styled.li`
    position: absolute;
    top: 46%;
    left: 0;
    right: 0;
    font-size: 20px;
    font-weight: 600;
    list-style: none;
    text-align: center;
    &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) {
        display: none;
    }
`
const StyledTitle = styled.h1`
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 34px;
    letter-spacing: 7px;
    text-transform: capitalize;
    &:after {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        bottom: -25px;
        margin: 0 auto;
        width: 200px;
        height: 5px;
        background-color: #ffdd56;
        border-radius: 10px;
    }
`
const StyledP = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0px;
    text-align: center;
`
const StyledSpan = styled.span`
    color: #000;
    font-size: 12px;
    font-weight: 600;
    background-color: #ffdd56;
    border-radius: 10px;
    padding: 5px 10px;
    text-align: center;
`
const StyledFlexPoke = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const StyledCardInfo = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: 0 auto;
    height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const StyledWH = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledError = styled.p`
   font-size: 16px;
   padding: 0px 20px;
`

//TypeScript
type IPokemonProps = {
    id?: number
    name?: string
    base_experience?: number
    height?: number
    is_default?: boolean
    order?: number
    weight?: number
    sprites?: {
        back_default: string
        back_shiny: string
        front_default: string
        front_shiny: string
    }
    stats?: [{
        base_stat: number
        stat: {
            name: string
        }
    }]
    types?: [{
        type: {
            name: string
        }
    }]
    matchUrl?: string 
}

const Single: FC<IPokemonProps> = ({ matchUrl }): JSX.Element => {

    const [pokemon, setPokemon] = useState<IPokemonProps>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<{ code: number | null, status: boolean | null }>({
        code: null,
        status: null
    })
    
    useEffect(() => {
        setLoading(true)
        axios.get<IPokemonProps>(`https://pokeapi.co/api/v2/pokemon/${matchUrl}`)
            .then( res => {
                if (res.status < 300) {
                    setLoading(false)
                    setPokemon(res.data)
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

    const pokeWeight: number | undefined = pokemon?.weight
    const weight = pokeWeight ? pokeWeight / 10 : undefined

    const pokeHeight: number | undefined = pokemon?.height
    const height = pokeHeight ? pokeHeight / 10 : undefined

    return (
        <StyledSection>
            {   loading ? 
                <StyledImg src={`./pokeball.png`} />
            :   error?.code && error?.code > 300 ?
                <StyledError><b>{error?.code}</b>. That's an error.<br></br>The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.</StyledError>
            :
                <React.Fragment>
                    <StyledCard>
                        <StyledPokeImage src={pokemon?.sprites?.front_default} />
                    <StyledCardInfo>
                        <StyledTitle>{pokemon?.name}</StyledTitle>
                        <StyledFlexPower>
                            {pokemon?.stats && pokemon?.stats.map((stat: any) => (
                                <StyledLiStat key={stat?.stat?.name}>
                                    {stat?.stat?.name} {stat?.base_stat}
                                </StyledLiStat>
                            ))}
                        </StyledFlexPower>
                        <StyledFlexPoke>
                            <StyledFlexPower>
                                {pokemon?.types && pokemon?.types.map((type: any) => (
                                    <StyledLiType key={type?.type?.name}>
                                        <StyledP>{type?.type?.name}</StyledP>
                                        <StyledSpan>Type</StyledSpan>
                                    </StyledLiType>
                                ))}
                                </StyledFlexPower>
                            <StyledWH>
                                <StyledP>{weight}kg</StyledP>
                                <StyledSpan>Weight</StyledSpan>
                            </StyledWH>
                            <StyledWH>
                                <StyledP>{height}m</StyledP>
                                <StyledSpan>Height</StyledSpan>
                            </StyledWH>
                        </StyledFlexPoke>
                    </StyledCardInfo>
                    </StyledCard>
                </React.Fragment>       
            }
        </StyledSection>
    )

}
export default Single