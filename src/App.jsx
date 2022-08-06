import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Recording,
  NotFound,
} from "./views";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/live" element={<Recording />}/> {/*We change our Recording view to a /live path*/} 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
