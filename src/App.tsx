import { Layout } from 'antd';
import MainHeader from './components/Header/Header';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import FullBook from './pages/FullBook';

const App = () => {
  return (
    <Layout>
      <MainHeader></MainHeader>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path=":bookId" element={<FullBook></FullBook>}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
