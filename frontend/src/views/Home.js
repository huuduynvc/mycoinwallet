import React, { useContext, useRef } from 'react';
import { ReactComponent as IMG } from "../images/img.svg";
import { ReactComponent as BG } from "../images/bg.svg";
import { productAPI } from 'config/productAPI';
import { TYPE } from 'reducer/userReducer';
import { UserContext } from 'contexts/UserProvider';
import ReactNotificationAlert from 'react-notification-alert';
import { useHistory } from 'react-router';

var options = {};


const Home = () => {
    const refInput = useRef(null);
    const history = useHistory();
    const [state, dispatch] = useContext(UserContext);
    const notificationAlertRef = React.useRef(null);

    if (state.privateKey) {
        history.push("/user/dashboard");
        return < > < />;
    }

    const changeOption = (value, status) => {
        options = {
            place: 'tr',
            message: ( <
                div >
                <
                div > { value } <
                /div> <
                /div>
            ),
            type: status,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        }
    }

    const myFun = (value, status) => {
        changeOption(value, status);
        if (notificationAlertRef.current) {
            notificationAlertRef.current.notificationAlert(options);
        }
    }
    const handleGetFileStore = async() => {
        if (refInput.current.value) {
            dispatch({ type: TYPE.CALLING_API });
            const file = refInput.current.files.item(0);
            const text = await file.text();
            try {
                const key = JSON.parse(text);
                await productAPI.getWallet(JSON.parse(text)).then((res) => {
                    myFun("Access", "success");
                    dispatch({ type: TYPE.SET_USER, payload: { key, balance: res.data.balance } });
                }).catch(() => {
                    myFun("Incorrect", "danger");
                    dispatch({ type: TYPE.DONE_CALL });
                });
                refInput.current.value = null;
            } catch (error) {
                myFun("Incorrect", "danger");
                dispatch({ type: TYPE.DONE_CALL });
            }

        }
    }

    const handleCreateWallet = async() => {
        dispatch({ type: TYPE.CALLING_API });
        await productAPI.createWallet().then((res) => {
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(res.data)], { type: 'text/plain;charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = "keystore.txt";
            document.body.appendChild(element);
            element.click();
            dispatch({ type: TYPE.DONE_CALL });
        }).catch(() => {
            dispatch({ type: TYPE.DONE_CALL });
        });
    }
    return ( <
        div className = "home__wrapper" >
        <
        div className = "react-notification-alert-container" >
        <
        ReactNotificationAlert ref = { notificationAlertRef }
        /> <
        /div> <
        header className = "home__main-layout"
        style = {
            { paddingTop: 0 } } >
        <
        div className = "home__main-layout--right" >
        <
        h1 style = {
            { color: "green", fontSize: 60 } } >
        Jerry Wallet <
        /h1> <
        p style = {
            { color: "gray", fontSize: 18 } } >
        Jerry Wallet(our friends call us JW) is a free, client - side interface helping you interact with the jerry blockchain.Our easy - to - use, open - source platform allows you to generate wallets, interact with smart contracts, and so much more. <
        /p> <
        /div> <
        div className = "home__main-layout--left" >
        <
        IMG width = "500"
        height = "500" / >
        <
        /div> <
        /header> <
        section className = "home__options" >
        <
        button onClick = { handleCreateWallet }
        className = "home__options--button"
        style = {
            { backgroundColor: "orange" } } > { /* <img width="87" src="https://www.myetherwallet.com/img/create-wallet.73282ac1.png" alt="wallet" /> */ } <
        div className = "home__options--button-container" >
        <
        h2 style = {
            { marginBottom: 0 } } > Create a new wallet >>> < /h2> <
        /div> <
        /button> <
        button onClick = {
            () => {
                if (refInput.current) {
                    refInput.current.click();
                }
            }
        }
        className = "home__options--button"
        style = {
            { backgroundColor: "green" } } > { /* <img width="87" src="https://www.myetherwallet.com/img/unlock-wallet.3f0ec389.png" alt="wallet" /> */ } <
        div className = "home__options--button-container" >
        <
        h2 style = {
            { marginBottom: 0 } } > Access my wallet >>> < /h2> <
        input onChange = { handleGetFileStore }
        ref = { refInput }
        style = {
            { display: "none" } }
        type = "file"
        accept = ".txt" / >
        <
        /div> <
        /button> <
        /section> {
            /* <footer className="home__footer">
                            <div className="home__footer--about">
                                <h3>About MW</h3>
                                <p>MyCoinWallet - please, call us MW - puts the MCOIN blockchain at your fingertips. We are a team of crypto-enthusiasts dedicated to bring you the most secure, most intuitive, and dare we say prettiest way to manage your MCOIN tokens. We're always here to help, and we're never giving away MCOIN. Cheers!</p>
                            </div>
                            <div className="home__footer--img">
                                <div className="home__footer--img-svg">
                                    <BG width="300" />
                                </div>
                            </div>
                        </footer> */
        } <
        /div>
    );
}

export default Home;