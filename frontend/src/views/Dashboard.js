import React from "react";
import { useHistory } from "react-router";
// nodejs library that concatenates classes
import {
  Card, Col, Row, CardTitle, CardText
} from 'reactstrap';

function Dashboard(props) {
  const history = useHistory();
  return (
    <>
      <div className="content">
        <Row>
          <Col style={{ 'margin-left':'55px' }}>
            <Card className="mycard" style={{ 'text-align':'center' ,'background':'blue'}}>
              <CardText onClick={() => history.push("/user/send-transaction")}>
                  <h4 style={{ 'font-weight':'bold' }}>Send Transaction</h4>
              </CardText>
            </Card>
          </Col>
                    <Col>
            <Card className="mycard" style={{ 'text-align':'center' ,'background':'blue'}}>
              <CardText onClick={() => history.push("/user/mining")}>
                  <h4 style={{ 'font-weight':'bold' }}>Mining </h4>
              </CardText>
            </Card>
          </Col>
                    <Col>
            <Card className="mycard" style={{ 'text-align':'center','background':'blue'}}>
             <CardText onClick={() => history.push("/user/history")}>
                <h4 style={{ 'font-weight':'bold' }}>History Your Transactions</h4>
            </CardText>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
