import CardMain from 'components/CardMain';
import { UserContext } from 'contexts/UserProvider';
import React, { useContext } from 'react';
import ReactNotificationAlert from 'react-notification-alert';

var options = {};
options = {
    place: 'tr',
    message: (
        <div>
            <div>
                Copied.
            </div>
        </div>
    ),
    type: "success",
    icon: "tim-icons icon-bell-55",
    autoDismiss: 7
}

const ListCard = () => {
    const [state] = useContext(UserContext);
    const imgAdress = [{ src: "https://www.myetherwallet.com/img/copy.ec4723ca.svg", alt: "Copy", type: "clipboard" }]

    const imgBalance = [{ src: "https://www.myetherwallet.com/img/change.9edf0256.svg", alt: "Refresh Balance", type: "none" }]
    const notificationAlertRef = React.useRef(null);

    const myFun = () => {
        notificationAlertRef.current.notificationAlert(options);
    }
    return (
        <div className="listcard">
            <div className="react-notification-alert-container">
                <ReactNotificationAlert ref={notificationAlertRef} />
            </div>
            <CardMain onClick={myFun} avatar="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADj0lEQVR4Xu3dsXEVQRBF0f2x4OCKLLBkKARcFQlgkwEuIeDgKAxciioKg0AgiGs8hn/k90zr9d03Pb92Z27v33z9c4W/t18+h2ihVYGXp3dpiBsAkn7zYADMS7BNAABb/eezA2Begm0CANjqP58dAPMSbBMAwFb/+ewAmJdgmwAAtvrPZwfAvATbBACw1X8+OwDmJdgmAICt/vPZATAvwTYBAGz1n8+eAXj59ZjeB6gKvPr+KQ3x8/Vziq/Bp+d/A0BDAABNv+t0AU/PnwPcOcAAAIAmsDBgCSjqXZceYLyLsQTcOcAAAIAeoDCgByjq6QGu9S+ZloA7BxgAANADFAb0AEU9PYAe4PQn6PT88+fh0QBy+PPHhzxGGeDTh28lfB4LgFgCAEQBazgHaApygKbfxQGigDWcAzQFOUDTjwNE/XI4B2gScoCmHweI+uVwDtAk5ABNPw4Q9cvhHKBJyAGafhwg6pfDOUCTkAM0/ThA1C+Hc4AmIQdo+nGAel/A6S9UrPPPB0Ss7wtYCxgNYP5pGwDG39atAQYAAJKJ5SZQD7A944gDcAAOkBSIwXqAeG3cWsBYf7sAPYAeID1EHKAddKkJ1ASmB9A2MMm3P+SKA3CAhDAHSPJxgMsuwC4gPUN2AeNdwI+X3+m+gPUpV4m+/yC4PkA3AJxNAQDOrl/OHgBZwrMHAMDZ9cvZAyBLePYAADi7fjl7AGQJzx4AAGfXL2cPgCzh2QMA4Oz65ewBkCU8ewAAnF2/nD0AsoRnDwCAs+uXswdAlvDsAeYAVPnq+wRVgHvPP78PcO8Cng4wACLBALhzAQEAgKTAuoexBKTyXfnaNwDEL3vWAloC7vwJAgAAkgJrB9MDpPLpAaJ85wtoCYgInC7g6flbAu4cYAAAoH0dHPU7/ocUS0Ak4HQBT88/LwHry5PrCSWR36se0lTnrzemACBWAAAfvkUJWzgHeEgCcoAk32UJ0AO8iwi1cD1APK28yc8B5tem6QH0APUhTvF2AXYBCaAarAfQAySGbAOTfJpATeCTbWB8hlq4XYBdQCMoRtsF2AVEhFq4XYBdQCLo9vLrMd0XUN9rry9UpP/+Hwhe6weAMQQAiN8GjuuXpwcAABJEdQm1BCT5ezAH4ACJIg6Q5NsHcwAOkCjkAEm+fTAH4ACJQg6Q5NsHcwAOkCjkAEm+fTAH4ACJQg6Q5NsHcwAOkCisDvAXkyQR/Y0PO5YAAAAASUVORK5CYII=" img={imgAdress} title="Address" content={state.publicKey} />
            <CardMain avatar="https://www.myetherwallet.com/img/wallet.66b8433e.svg" img={imgBalance} title="Balance" content={`${state.balance} MC`} />
        </div>
    );
}

export default ListCard;
