import React, { useState, useEffect } from 'react'
import { Table } from 'baseui/table'
import { Checkbox, STYLE_TYPE } from 'baseui/checkbox'
import { Input } from 'baseui/input'
import { FlexFullContainer } from '../../Elements'
import db from '../../DB'

const checkInPlayer = (player, setData) => {
    db
        .get('players')
        .find({ dci: player.dci })
        .assign({ checkedIn: !player.checkedIn })
        .write()

        setData(getData(db.get('players').value(), setData))
}

const filterData = (data, filterString) => {
    if (!filterString) return data
    return data.filter(datum => {
        return datum.some(key => {
            if (!key.includes || !key.toLowerCase) return false
            return key.toLowerCase().includes(filterString.toLowerCase())
        })
    })
}

const getData = (players, setData) => players.map((player) => ([
    player.name,
    player.dci,
    <Checkbox
        checked={player.checkedIn}
        checkmarkType={STYLE_TYPE.toggle}
        onChange={() => checkInPlayer(player, setData)}
    />,
]))

const PlayerList = (props) => {
    const columns = ['Name', 'DCI', 'Checked In']
    const [ data, setData ] = useState([])
    const [ filterString, setFilterString ] = useState('')
    useEffect(() => {
        setData(getData(db.get('players').value(), setData))
    }, [])

    return (
        <FlexFullContainer $dir='column'>
            <h1>Player Check-In</h1>
            <Input
                placeholder='Filter...'
                value={filterString}
                onChange={({ target: { value }}) => setFilterString(value)}
            />
            <Table columns={columns} data={filterData(data, filterString)} />
        </FlexFullContainer>
    )
}

export default PlayerList