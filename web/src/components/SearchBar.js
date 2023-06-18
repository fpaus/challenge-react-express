import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import useQueryParam from '../hooks/useQueryParam'

import { useDispatch } from 'react-redux'
const SearchBar = () => {
  const [filename, setFileName] = useQueryParam('filename')

  const [fileToSearch, setFileToSearch] = useState(filename)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch.files.getFiles(filename)
  }, [dispatch.files, filename])
  const handleSearch = () => {
    setFileName(fileToSearch)
  }
  return (
    <Container>
      <Row>
        <Col md={5}>
          <Form.Control
            type='text'
            value={fileToSearch}
            onChange={(e) => setFileToSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handleSearch} variant='primary'>
            Search by file
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBar
