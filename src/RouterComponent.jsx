import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'
import AboutComponent from './components/AboutComponent'
import NewsComponent from './components/NewsComponent'
import ContactComponent from './components/ContactComponent'
import DashboardComponent from './components/admin/DashboardComponent'
import ShowUsersComponent from './components/admin/ShowUsersComponent'
import AdminRouteMiddleware from './middleware/AdminRouteMiddleware'
import LoginComponent from './components/auth/LoginComponent'
import { AddUsersComponent } from './components/admin/AddUsersComponent'

export default function RouterComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/news" element={<NewsComponent />} />
        <Route path="/Login" element={<LoginComponent />} />

        <Route path="/admin" element={<AdminRouteMiddleware/>}>
          <Route path='/admin' element={<DashboardComponent />} />
          <Route path="show-users" element={<ShowUsersComponent />} />
          <Route path="add-users" element={< AddUsersComponent/>} />
        </Route>
      </Routes>
    </div>
  )
}
