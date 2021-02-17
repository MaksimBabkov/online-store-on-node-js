const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDB = {
  id: 136345,
  email: 'ваш логин для входа в систему',
  password: '*******',
};

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Десериализация: ', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function(
    email,
    password,
    done
  ) {
    if (email === userDB.email && password === userDB.password) {
      return done(null, userDB);
    } else {
      return done(null, false);
    }
  })
);
