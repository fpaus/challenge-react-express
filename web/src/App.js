import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { Provider } from 'react-redux';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Title from './components/Title';
import store from './store';
function App () {
  return (
    <Provider store={store}>
      <Stack gap={3}>
        <Container>
          <Title />
          <SearchBar />
          <Table />
        </Container>
      </Stack>
    </Provider>
  )
}

export default App
