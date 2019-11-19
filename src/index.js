import React from 'react';
import { render } from 'react-dom';

import "./assets/favicon/favicon";
import "./assets/scss/base.scss";

import Main from "./components/Main/Main.jsx";

const rootElement = document.getElementById('root');
rootElement ? render(<Main />, rootElement) : false;