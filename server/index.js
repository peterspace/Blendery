const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('./middleWare/errorMiddleware');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');

//==========={using clodinary}============================
const { uploadImage } = require('./utils/uploadImage.js');

/* ROUTES */
const hdWalletsRoutes = require('./routes/hdWalletsRoutes');
const walletsRoutes = require('./routes/walletsRoutes');
const userRoutes = require('./routes/userRoutes');
const chainsArbitrumRoute = require('./routes/chainsArbitrumRoute');
const chainsAuroraRoute = require('./routes/chainsAuroraRoute');
const chainsAvalancheRoute = require('./routes/chainsAvalancheRoute');
const chainsBinanceRoute = require('./routes/chainsBinanceRoute');
const chainsBinanceTestnetRoute = require('./routes/chainsBinanceTestnetRoute');
const chainsEthereumRoute = require('./routes/chainsEthereumRoute');
const chainsFantomRoute = require('./routes/chainsFantomRoute');
const chainsGnosisRoute = require('./routes/chainsGnosisRoute');
const chainsGoerliEthRoute = require('./routes/chainsGoerliEthRoute');
const chainsKlaytnRoute = require('./routes/chainsKlaytnRoute');
const chainsOptimismRoute = require('./routes/chainsOptimismRoute');
const chainsPolygonMumbaiRoute = require('./routes/chainsPolygonMumbaiRoute');
const chainsPolygonRoute = require('./routes/chainsPolygonRoute');

const tokensRoutes = require('./routes/tokensRoutes');
const storeRoutes = require('./routes/storeRoutes');


//======={Other Routes}============================
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const enquiryRoute = require('./routes/enquiryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const placeRoutes = require('./routes/placeRoutes');
//====================={AUTH}==============================
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
//====================={AUTH}==============================

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      process.env.FRONTEND_URL,
      process.env.BACKEND_URL,
    ],
    credentials: true,
  })
);

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

let userInfo;

const loginGoogle = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      callbackURL: 'http://localhost:4000/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      userInfo = profile;
      return done(null, profile);
    }
  )
);

const loginFacebook = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      // callbackURL: process.env.BACKEND_URL + 'auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'], //optional
    },
    async function (accessToken, refreshToken, profile, done) {
      userInfo = profile;
      return done(null, profile);
    }
  )
);

const loginGithub = passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      // callbackURL: process.env.BACKEND_URL + 'auth/github/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//======={GET USER IP ADDRESS}============================

app.get('/', (req, res) =>{
  const ip =
  req.headers['cf-connecting-ip'] ||
  req.headers['x-real-ip'] ||
  req.headers['x-forwarded-for'] ||
  req.socket.remoteAddress || '';
  console.log({ip,})
  return res.json({
    ip,
  })
}
);

//======={Google}============================

app.get(
  '/auth/google',
  loginGoogle.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  loginGoogle.authenticate('google', {
    successRedirect: '/users/authSucessGoogle',
    failureRedirect: '/users/authErrorGoogle',
  })
);

//=====================================================================================

//======={Facebook}==========================

app.get(
  '/auth/facebook',
  loginFacebook.authenticate('facebook', { scope: 'email' })
);

app.get(
  '/auth/facebook/callback',
  loginFacebook.authenticate('facebook', {
    successRedirect: '/users/authSucessFacebook',
    failureRedirect: '/users/authErrorFacebook',
  })
);

//======={Github}==========================
app.get(
  '/auth/github',
  loginGithub.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  loginGithub.authenticate('github', {
    failureRedirect: '/users/authErrorloginGithub',
  }),
  function (req, res) {
    res.redirect('/users/authSucessGithub');
  }
);

//==={case2}============
// app.get(
//   '/auth/github/callback',
//   loginGithub.authenticate('github', {
//     successRedirect: '/users/authSucessGithub',
//     failureRedirect: '/users/authErrorGithub',
//   })
// );

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});
//======={Facebook}==========================

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ROUTES */
//=================={ROUTES}===============================================
app.use('/hdWallet', hdWalletsRoutes);
app.use('/wallet', walletsRoutes);
app.use('/users', userRoutes);
//=================={Chains Routes}===============================================
app.use('/chainsArbitrum', chainsArbitrumRoute);
app.use('/chainsAurora', chainsAuroraRoute);
app.use('/chainsAvalanche', chainsAvalancheRoute);
app.use('/chainsBinance', chainsBinanceRoute);
app.use('/chainsBinanceTestnet', chainsBinanceTestnetRoute);
app.use('/chainsEthereum', chainsEthereumRoute);
app.use('/chainsFantom', chainsFantomRoute);
app.use('/chainsGnosis', chainsGnosisRoute);
app.use('/chainsGoerliEth', chainsGoerliEthRoute);
app.use('/chainsKlaytn', chainsKlaytnRoute);
app.use('/chainsOptimism', chainsOptimismRoute);
app.use('/chainsPolygon', chainsPolygonRoute);
app.use('/chainsPolygonMumbai', chainsPolygonMumbaiRoute);
app.use('/token', tokensRoutes);
app.use('/store ', storeRoutes);


//=================={Payment Routes}===============================================
const paymentRoute = require('./routes/paymentRoute');
//=================={Chains Routes}===============================================

//=================={Network Routes}===============================================


//=================={Other Routes}===============================================
// app.use('/api/chat', chatRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
// app.use('/contactus', enquiryRoute);
app.use('/enquiry', enquiryRoute);
app.use('/transaction', transactionRoutes);
app.use('/place', placeRoutes);
app.use('/payment', paymentRoute);
//====================={AUTH}====================================

//======={using cloudinary}==================================

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const url = await uploadImage(link);
  res.json(url);
});

const photosMiddleware = multer({ dest: '/tmp' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    // const url = await uploadImage(req.files[i]);
    // uploadedFiles.push(url);

    const { path, originalname, mimetype } = req.files[i];

    console.log('originalPath', path);
    console.log('originalname', originalname);

    if (!mimetype.match(/jpe|jpeg|png|gif$i/)) {
      res.status(400).json('File is not supported');
    }

    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;

    const url = await uploadImage(path);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server;
  })
  .catch((err) => console.log(err));

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server Running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));

//============{Socket io}=====================================
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // origin:'http://127.0.0.1:5173',
    // credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData._id); // created room for this particular user
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
