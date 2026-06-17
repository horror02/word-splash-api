'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config.js');
const User = require('../models/user.model.js');

const adminUser = {
  username: 'admin',
  email: 'admin@wordsplash.com',
  password: 'Admin123!',
  name: 'Jecka',
  privilege: 'admin',
};

mongoose
  .connect(config.database.connectionString)
  .then(async () => {
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ privilege: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
    } else {
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);

      const newAdmin = new User({
        ...adminUser,
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log('Admin user created successfully:', newAdmin.email);
    }

    mongoose.connection.close();
    console.log('Connection closed');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
