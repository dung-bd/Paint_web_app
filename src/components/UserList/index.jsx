import { useUserList } from '../../hook/userList'
import styles from './style.module.css'
import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/User'

export default function UserList({ roomId }) {

    const { userList, raiseHand, kick, chooseWriter } = useUserList({ roomId })

    const [state, setState] = useState(false)
    return <div>
        <div>
            <button onClick={() => {
                raiseHand(roomId, !state)
                setState(s => !s)
            }}>{state ? 'Lower Hand' : 'Raise Hand'}</button>
        </div>
        <div className={styles.container}>
            {userList.map(u => <UserCard key={u._id} data={u} onChoose={() => chooseWriter({ roomId, userId: u._id })} onKick={() => kick({ roomId, userId: u._id })} />)}
        </div>
    </div>
}
const UserCard = ({ data: { _id, name, isRaisedHand = false }, onKick, onChoose }) => {

    return <div className={styles.userCard}>
        <div className={!isRaisedHand ? styles.hide : ''}>
            <p>🤚</p>
        </div>
        <div><p>{name}</p></div>

        <div className={styles.action}>
            <button onClick={onKick}>Kick</button>
            <button onClick={onChoose}>Choose</button>
        </div>
    </div>
}

