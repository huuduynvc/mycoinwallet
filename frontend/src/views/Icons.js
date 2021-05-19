/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import socket from "config/socketio";
import { EMIT_TYPE } from "constant/API";
import { UserContext } from "contexts/UserProvider";
import React, { useContext, useRef } from "react";
import ReactNotificationAlert from "react-notification-alert";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Input, Label, Button } from "reactstrap";

function Icons() {
  const refAmount = useRef(null);
  const refToAddress = useRef(null);
  const notificationAlertRef = useRef(null);
  const [state] = useContext(UserContext);
  let options = {};
  const changeOption = (value, status) => {
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            {value}
          </div>
        </div>
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

  const sendSocketTransaction = () => {
    if (refAmount.current.value && refAmount.current.value > 0 && refToAddress.current.value) {
      socket.emit(EMIT_TYPE.SEND_TRANSACTION, ({
        publicKey: state.publicKey,
        privateKey: state.privateKey,
        amount: refAmount.current.value,
        payeePublicKey: refToAddress.current.value
      }));
      myFun("Sent the transaction", "success");
    }
    else {
      myFun("Fill Full Fields", "danger");
    }
  }

  return (
    <>
      <div className="react-notification-alert-container">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h2 className="title" style={{'margin-left':'50px'}}>Send Transaction</h2>
              </CardHeader>
              <CardBody style={{ padding: "15px 3rem" }}>
                <Row style={{'color':'gray'}}>
                  <Col>
                    <Label style={{ fontSize: "1rem" }} for="amount">Amount</Label>
                    <Input innerRef={refAmount} type="number" name="amount" />
                  </Col>
                </Row>
                <br />
                <Row >
                  <Col>
                    <Label style={{ fontSize: "1rem" }} for="ToAddress">To Address</Label>
                    <Input innerRef={refToAddress} type="text" name="ToAddress" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Button onClick={sendSocketTransaction} style={{'background':'gray'}}> Send Transaction </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons;
