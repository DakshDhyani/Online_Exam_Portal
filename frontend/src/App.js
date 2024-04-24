
import { Button } from 'antd';
import './stylesheets/alignments.css'
import './stylesheets/textelements.css'
import './stylesheets/colors.css'
import './stylesheets/custom_components.css'
import './stylesheets/form_elements.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/common/login';
import Register from './pages/common/register';
import Protected_routes from './Components/Protected_routes';
import Home from './pages/common/Home';
import "./stylesheets/layout.css";
import Exams from './pages/admin/Exams';
import AddEditExam from './pages/admin/Exams/AddEditExams';
import WriteExam from './pages/user/WriteExam';
import UserReports from './pages/user/UserReports';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
              path="/"
              element={
                <Protected_routes>
                  <Home />
                </Protected_routes>
              }
            />

          <Route
            path="/user/write-exam/:id"
            element={
              <Protected_routes>
                <WriteExam />
              </Protected_routes>
            }
          />

          <Route
            path="/user/reports"
            element={
              <Protected_routes>
                <UserReports />
              </Protected_routes>
            }
          />

            <Route
            path="/admin/exams"
            element={
              <Protected_routes>
                <Exams />
              </Protected_routes>
            }
          />

            <Route
            path="/admin/exams/add"
            element={
              <Protected_routes>
                <AddEditExam/>
              </Protected_routes>
            }
          />
                    <Route
            path="/admin/exams/edit/:id"
            element={
              <Protected_routes>
                <AddEditExam />
              </Protected_routes>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <Protected_routes>
                <AdminReports />
              </Protected_routes>
            }
          />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
