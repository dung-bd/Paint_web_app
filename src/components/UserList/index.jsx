import { useUserList } from "../../hook/userList";
import styles from "./style.module.css";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/User";

export default function UserList({ roomId, admin, user, currentWriter }) {
  const { userList, raiseHand, kick, chooseWriter } = useUserList({ roomId });

  const [state, setState] = useState(false);
  return (
    <div style={{ marginTop: "5px" }}>
      <div>
        {admin && user && admin !== user && (
          <button
            onClick={() => {
              raiseHand(roomId, !state);
              setState((s) => !s);
            }}
          >
            {state ? "Lower Hand" : "Raise Hand"}
          </button>
        )}
      </div>
      <div className={styles.container}>
        {userList.map((u) => (
          <UserCard
            key={u._id}
            data={u}
            admin={admin}
            user={user}
            onChoose={() => chooseWriter({ roomId, userId: u._id })}
            onKick={() =>
              kick({ roomId, isAdmin: admin === user, userId: u._id })
            }
          />
        ))}
      </div>
    </div>
  );
}

const UserCard = ({
  data: { _id, name, isRaisedHand = false },
  admin,
  user,
  onKick,
  onChoose,
}) => {
  console.log(admin, _id);

  return (
    <div className={styles.userCard}>
      <div className={!isRaisedHand ? styles.hide : ""}>
        <p>🤚</p>
      </div>
      <div>
        <p>{name}</p>
      </div>
      {admin !== _id && (
        <div className={styles.action}>
          <button onClick={onKick}>Kick</button>
          <button onClick={onChoose}>Choose</button>
        </div>
      )}
    </div>
  );
};
