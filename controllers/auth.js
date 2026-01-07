const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {validateSignup, validateLogin} = require('../validator/auth')
const {User} = require('../models/user');

exports.signup = async (req, res) => {
  const { error } = validateSignup(req.body); 
  if (error) return res.status(400).json({error:error.details[0].message});
  try{
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({error : 'User already registered'});

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('Authorization', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
  }catch(err){
    res.send(err)
  }
}

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body); 
  if (error) return res.status(400).json({error : error.details[0].message});
  try{
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({error :'Invalid email or password'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error : 'Invalid password'});

    const token = user.generateAuthToken();
    const userId = user._id;
    res.status(200).send({token, userId : userId.toString(), role: user.role, name: user.name});
  }catch(err){
    res.send(err)
  }
}

exports.setupAdmin = async (req, res) => {
  try {
    // Check if admin user exists
    let admin = await User.findOne({ email: 'admin@admin.com' });

    if (admin) {
      // Admin exists, check if role is correct
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        return res.status(200).json({ 
          message: 'Admin user found and role updated to admin',
          email: 'admin@admin.com'
        });
      }
      return res.status(200).json({ 
        message: 'Admin user already exists with correct role',
        email: 'admin@admin.com'
      });
    }

    // Admin doesn't exist, create new one
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);
    
    admin = new User({
      name: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    
    res.status(201).json({ 
      message: 'Admin user created successfully',
      email: 'admin@admin.com',
      password: 'admin (please change after first login)'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to setup admin user' });
  }
}
