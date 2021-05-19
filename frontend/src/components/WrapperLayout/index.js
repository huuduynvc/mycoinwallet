import ListCard from 'components/ListCard';
import socket from 'config/socketio';
import { EMIT_TYPE } from 'constant/API';
import { UserContext } from 'contexts/UserProvider';
import { isValidNewBlock, minePendingTransactions } from 'function';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TYPE } from 'reducer/userReducer';

const WrapperLayout = ({ children }) => {
    const [state, dispatch] = useContext(UserContext);
    const [lastBlock, setLastBlock] = useState(null);
    const [difficulty, setDifficulty] = useState(0);
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [blockMining, setBlockMining] = useState(null);


    useEffect(() => {
        if (state.isMining) {
            socket.emit(EMIT_TYPE.START_MINING, (pendingtrans) => {
                setPendingTransactions(pendingtrans);
            })
            window.addEventListener('beforeunload', alertUser);
        }
        return () => {
            if (state.isMining) {
                socket.emit(EMIT_TYPE.STOP_MINING);
                window.removeEventListener('beforeunload', alertUser);
            }
        }
    }, [state.isMining]);

    useEffect(() => {
        if (state.isMining) {
            setBlockMining(minePendingTransactions(pendingTransactions, difficulty, lastBlock));
        }
    }, [difficulty, lastBlock, pendingTransactions, state.isMining])


    useEffect(() => {
        if (state.isMining) {
            socket.on(EMIT_TYPE.MINING_ABLOCK, (block) => {
                if (isValidNewBlock(block, lastBlock)) {
                    socket.emit(EMIT_TYPE.VOTE_NEW_BLOCK, { block, vote: true });
                    setBlockMining(null);
                } else socket.emit(EMIT_TYPE.VOTE_NEW_BLOCK, { block, vote: false });
            });

            socket.on(EMIT_TYPE.NEW_TRANSACTION, (transaction) => {
                const newPendingTranaction = [...pendingTransactions];
                newPendingTranaction.push(transaction);
                setPendingTransactions(newPendingTranaction);
            });
        }

        return () => {
            socket.removeEventListener(EMIT_TYPE.NEW_TRANSACTION);
            socket.removeEventListener(EMIT_TYPE.MINING_ABLOCK);
        }

    }, [state.isMining, pendingTransactions, lastBlock, difficulty])

    useEffect(() => {
        if (state.isMining && blockMining) {
            socket.emit(EMIT_TYPE.MINING_DONE_A_BLOCK, ({ block: blockMining, minerAddress: state.publicKey }));
        }
        return () => {
            socket.removeEventListener(EMIT_TYPE.MINING_DONE_A_BLOCK);
        };
    }, [blockMining, state.isMining, state.publicKey]);

    useEffect(() => {
        socket.emit(EMIT_TYPE.LOGIN);
        return () => {
            socket.removeAllListeners();
        }
    }, []);

    useEffect(() => {
        socket.on(EMIT_TYPE.LAST_BLOCK, async({ block, difficulty, pendingTransactions }) => {
            setLastBlock(block);
            setDifficulty(difficulty);
            setPendingTransactions(pendingTransactions);
            const key = {
                primaryKey: state.primaryKey,
                publicKey: state.publicKey
            }
            socket.emit(EMIT_TYPE.GET_BALANCE, ({ key }), ({ balance }) => {
                if (balance >= 0) {
                    dispatch({ type: TYPE.SET_BALANCE, payload: { balance } });
                }
            })


        });
        return () => {
            socket.removeEventListener(EMIT_TYPE.LAST_BLOCK);
        }
    }, [dispatch, state.primaryKey, state.publicKey])

    const alertUser = e => {
        e.preventDefault();
        return e.returnValue = "Process is Mining. Are you want to leave this page?";
    }

    return ( <
        div className = "content" >
        <
        ListCard / > { children } <
        /div>
    );
}

export default WrapperLayout;