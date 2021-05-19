import socket from "config/socketio";
import { EMIT_TYPE } from "constant/API";
import { UserContext } from "contexts/UserProvider";
import React, { useContext, useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [state] = useContext(UserContext);

  const [blockchain, setBlockchain] = useState({ chain: [] });
  useEffect(() => {
    socket.emit(EMIT_TYPE.GET_BLOCKCHAIN, (blockchain) => {
      blockchain.chain.reverse();
      setBlockchain(blockchain);
    })
    socket.on(EMIT_TYPE.HISTORY_BLOCKCHAIN, (blockchain) => {
      blockchain.chain.reverse();
      setBlockchain(blockchain);
    })
    return () => {
      socket.removeEventListener(EMIT_TYPE.HISTORY_BLOCKCHAIN);
    }
  }, []);

  const renderTransaction = (transaction) => {
    return transaction.map(ele => (<tr>
      <th className="tablesorter-col1">{ele.fromAddress ? ele.fromAddress : "SYSTEM"}</th>
      <th className="tablesorter-col2">{ele.toAddress}</th>
      <th className="tablesorter-col3">{ele.amount}</th>
    </tr>))
  };

  const renderTransactionUser = (transaction) => {
    return transaction.map(ele => {
      if (ele.fromAddress === state.publicKey || ele.toAddress === state.publicKey) {
        return (<tr>
          <th className="tablesorter-col1">{ele.fromAddress ? ele.fromAddress : "SYSTEM"}</th>
          <th className="tablesorter-col2">{ele.toAddress}</th>
          <th className="tablesorter-col3">{ele.amount}</th>
        </tr>)
      }
      return <></>;
    })
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4" style={{'margin-left':'50px'}}>Your transaction</CardTitle>
              </CardHeader>
              <CardBody className="mytable" style={{'color':'gray'}}>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      blockchain.chain.map(block => {
                        return renderTransactionUser(block.transaction);
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" style={{'margin-left':'50px'}}>History transactions</CardTitle>
              </CardHeader>
              <CardBody className="mytable">
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      blockchain.chain.map(block => {
                        return renderTransaction(block.transaction);
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
