const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

