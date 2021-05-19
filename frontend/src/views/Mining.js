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
import React, { useContext } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { UserContext } from "contexts/UserProvider";
import { TYPE } from "reducer/userReducer";
function Mining() {
  const [state,dispatch] = useContext(UserContext);

  const handleStartMining = () => {
    if (state.isMining){
      dispatch({type: TYPE.STOP_MINER});
    }
    else dispatch({type:TYPE.BEGIN_MINER});
  }

  return (
    <>
      <div className="content" style={{'margin-left':'50px'}}>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h2 className="title"> {state.isMining ?"Process is Mining!!!": "Mining"}</h2>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Button style={{'background':'gray'}} onClick={handleStartMining}> {state.isMining ? "Stop Mining" : "Start Mining"} </Button>
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

export default Mining;
