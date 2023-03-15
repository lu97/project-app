import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArticleListComponent from "./article_list/ArticleListComponent";
import ArticleComponent from "./article/ArticleComponent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ArticleListComponent />} />
                <Route path="/page/:id" element={<ArticleComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
