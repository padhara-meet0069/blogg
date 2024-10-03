import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Path from './Commen/Path';
import DashboardScreen from './Screens/Dashboard/DashboardScreen';
import CategoryScreen from './Screens/Category/CategoryScreen';
import ProductScreen from './Screens/Product/ProductScreen';
import MediaScreen from './Screens/Medias/MediaScreen';
import AddPostScreen from './Screens/Post/AddPostScreen';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path={Path.dashboard} element={<Layout component={<DashboardScreen/>} />} />
          <Route path={Path.category} element={<Layout component={<CategoryScreen/>}  />} />
          <Route path={Path.product} element={<Layout component={<ProductScreen/>} />} />
          <Route path={Path.media} element={<Layout component={<MediaScreen/>} />} />
          <Route path={Path.addPost} element={<Layout component={<AddPostScreen/>} />} />
  
        </Routes>
      </div>
    </BrowserRouter>
    </ThemeProvider> 
  );
}

export default App;
