import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import BootstrapTable from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';
import { useSelector } from 'react-redux';
const Table = () => {
  const {files, loading, error} = useSelector(state => state.files)
  if (loading) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (error) return (
    <Container>
      <Toast bg="danger">
        <Toast.Body>{error.error}</Toast.Body>
      </Toast>
    </Container>
  );

  return (
    <BootstrapTable striped bordered hover>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        { files.map((item, index) => {
          return item.lines.map((line, index) => {
            return (
              <tr key={item.file + line.text}>
                <td>{item.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            );
          });
        }) }
      </tbody>
    </BootstrapTable>
  );
}

export default Table
