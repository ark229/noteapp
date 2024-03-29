const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/user');

const router = express.Router();

