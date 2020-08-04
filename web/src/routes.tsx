import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm'
import TeachersList from './pages/TeachersList'

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={ Landing } />
            <Route path="/give-classes" component={ TeacherForm } />
            <Route path="/study" component={ TeachersList } />
        </BrowserRouter>
    )
}
export default Routes