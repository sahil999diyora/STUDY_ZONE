import './App.css';
import AdminLogin from './Components/AdminPanelComponents/AdminLogin';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from './Components/AdminPanelComponents/Categories';
import SubCategories from './Components/AdminPanelComponents/SubCategories';
import QuestionAnswer from './Components/AdminPanelComponents/QuestionAnswer';
import Dashbord from './Components/AdminPanelComponents/Dashbord';
import NavUser from './Components/UserPanelComponents/NavUser';
import MiddleUser from './Components/UserPanelComponents/MiddleUser';
import Questions from './Components/UserPanelComponents/Questions';
import CategoriesCard from './Components/UserPanelComponents/CategoriesCard';
import SubCategoriesCard from './Components/UserPanelComponents/SubCategoriesCard';
import Footer from './Components/UserPanelComponents/Footer';

function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/">
            <NavUser />
            <MiddleUser />
            <CategoriesCard />
            <Footer />
          </Route>

          <Route exact path="/Categories">
            <NavUser />
            <CategoriesCard />
            <Footer />
          </Route>

          <Route exact path="/SubCategories">
            <NavUser />
            <SubCategoriesCard />
            <Footer />
          </Route>

          <Route exact path="/SubCategories/:CategoriesID">
            <NavUser />
            <SubCategoriesCard />
            <Footer />
          </Route>

          <Route exact path="/Questions">
            <NavUser />
            <Questions />
            <Footer />
          </Route>

          <Route exact path="/Questions/:SubCategoriesID">
            <NavUser />
            <Questions />
            <Footer />
          </Route>

          <Route exact path="/admin">
            <Dashbord />
          </Route>

          <Route exact path="/admin/Categories">
            <Categories />
          </Route>

          <Route exact path="/admin/SubCategories">
            <SubCategories />
          </Route>

          <Route exact path="/admin/QuestionAnswer">
            <QuestionAnswer />
          </Route>

          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>

        </Switch>
      </Router>

    </div>
  )
}

export default App;