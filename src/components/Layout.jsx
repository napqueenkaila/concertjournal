import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main className="p-4 sm:p-8 lg:p-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}