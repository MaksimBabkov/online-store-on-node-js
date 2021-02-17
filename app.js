const mysql = require("mysql2");            //Движок
const express = require("express");        //express
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require('passport');
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");  //парсер
const multer  = require("multer");
const mailer = require('./nodemailer');
const { json } = require("body-parser");
const { serializeUser } = require("passport");
const { default: db } = require("./config");
const jsonParser = express.json();

const MAIL = require("./mail.json")


var upload = multer({ dest: 'uploads/' });


const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public')); //подключение CSS



const config = require('./config.json');
 
const pool =  mysql.createPool({    //подключение к БД
  connectionLimit: 5,
  host: config.host,
  user: config.user ,
  database: config.database,
  password: config.password 
});




app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

/////////////////
/////////////////

app.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());


app.get('/olga', (req, res) => {
  console.log(req.session);
  res.render('olga.hbs');
});

app.post('/login', (req, res, next) => {
   passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!<hr> <a href="/user">Ввести пароль еще раз</a>');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/olga');
  }
};

app.get('/admin', auth, (req, res) => {
 res.render('admin.hbs');
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/olga');
});



//////////////////////
//////////////////////


// получение списка пользователей
app.get("/polzovatel", function(req, res){
  pool.query("SELECT * FROM users",function(err, data) {
    if(err) return console.log(err);
    res.render("polzovatel.hbs", {
        users: data
    });
  });
  });

// получение списка пользователей
app.get("/adminmen", auth, function(req, res){
pool.query("SELECT * FROM men", function(err, data) {
  if(err) return console.log(err);
  res.render("adminmen.hbs", {
    men: data
  });
});
});


//получение списка пользователей
app.get("/adminkinder", auth, function(req, res){
pool.query("SELECT * FROM kinder", function(err, data) {
  if(err) return console.log(err);
  res.render("adminkinder.hbs", {
    kinder: data
  });
});
});

  

 // получение списка пользователей
 app.get("/", function(req, res){
  pool.query("SELECT * FROM users",function(err, data) {
    if(err) return console.log(err);
    res.render("index.hbs", {
        users: data
    });
  });
  });

  // получение списка пользователей
app.get("/contact", function(req, res){
  pool.query("SELECT * FROM men",function(err, data) {
    if(err) return console.log(err);
    res.render("contact.hbs", {
        men: data
    });
  });
  });

  // получение списка пользователей
app.get("/kinder", function(req, res){
  pool.query("SELECT * FROM kinder",function(err, data) {
    if(err) return console.log(err);
    res.render("kinder.hbs", {
        kinder: data
    });
  });
  });


const storageConfig = multer.diskStorage({
destination: (req, files, cb) =>{
    cb(null, "uploads");
},
filename: (req, files, cb) =>{
    cb(null, files.originalname);
}
});
// определение фильтра
const fileFilter = (req, files, cb) => {

if(files.mimetype === "image/png" || 
files.mimetype === "image/jpg"|| 
files.mimetype === "image/jpeg"){
    cb(null, true);
}
else{
    cb(null, false);
}
}

app.use(express.static(__dirname));

//app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));



// возвращаем форму для добавления данных


app.get("/create", auth,  function(req, res, next){
  res.render("create.hbs");
});



// получаем отправленные данные и добавляем их в БД 
app.post("/create", urlencodedParser, upload.array('filedate'), function (req, res, next) {

  
if(!req.body) return res.sendStatus(400);
  
  const name = req.body.name;
  const age = req.body.age;
  const text = req.body.text;
  const silka = req.body.silka;
  const oldcena = req.body.oldcena;

  const img = req.files[0].path;
  const img1 = req.files[1].path;
  const img2 = req.files[2].path;
  const img3 = req.files[3].path;
  const img4 = req.files[4].path;

  
  pool.query("INSERT INTO users (name, age, text, silka, img, oldcena, img1, img2, img3, img4) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, age, text, silka, img, oldcena, img1, img2, img3, img4], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/admin");  //("/sektion")
  });
});

////////createMen
app.get("/createmen", auth, function(req, res, next){
  res.render("createmen.hbs");
});

// получаем отправленные данные и добавляем их в БД 
app.post("/createmen", urlencodedParser, upload.array('filedate'), function (req, res, next) {

  if(!req.body) return res.sendStatus(400);
  
  
  const name = req.body.name;
  const age = req.body.age;
  const text = req.body.text;
  const silka = req.body.silka;
  const oldcena = req.body.oldcena;

  const img = req.files[0].path;
  const img1 = req.files[1].path;
  const img2 = req.files[2].path;
  const img3 = req.files[3].path;
  const img4 = req.files[4].path;

  pool.query("INSERT INTO men (name, age, text, silka, img, oldcena, img1, img2, img3, img4) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, age, text, silka, img, oldcena, img1, img2, img3, img4], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/adminmen");  //("/sektion")
  });
});
////////createMen

////////createKinder
app.get("/createkinder", auth, function(req, res, next){
  res.render("createkinder.hbs");
});

// получаем отправленные данные и добавляем их в БД 
app.post("/createkinder", urlencodedParser, upload.array('filedate'), function (req, res, next) {

  if(!req.body) return res.sendStatus(400);
  
  
  const name = req.body.name;
  const age = req.body.age;
  const text = req.body.text;
  const silka = req.body.silka;
  const oldcena = req.body.oldcena;
  
  const img = req.files[0].path;
  const img1 = req.files[1].path;
  const img2 = req.files[2].path;
  const img3 = req.files[3].path;
  const img4 = req.files[4].path;
  

  pool.query("INSERT INTO kinder (name, age, text, silka, img, oldcena, img1, img2, img3, img4) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, age, text, silka, img, oldcena, img1, img2, img3, img4], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/adminkinder");  //("/sektion")
  });
});
////////createKinder




// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", auth, function(req, res){
const id = req.params.id;
pool.query("SELECT * FROM men WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
   res.render("edit.hbs", {
      user: data[0]
  });
});
});

// получаем отредактированные данные и отправляем их в БД
app.post("/edit", urlencodedParser, function (req, res) {
       
if(!req.body) return res.sendStatus(400);
const name = req.body.name;
const age = req.body.age;
const text = req.body.text;
const silka = req.body.silka;
const img = req.body.img;
const oldcena = req.body.oldcena;
const id = req.body.id;
 
pool.query("UPDATE men SET name=?, age=?, text=?, silka=?, img=?, oldcena=? WHERE id=?", [name, age, text, silka, img, oldcena, id], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/");
});
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/deleteadmin/:id", function(req, res){
        
const id = req.params.id;
pool.query("DELETE FROM users WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/admin");
});
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/deleteadminmen/:id", function(req, res){
        
const id = req.params.id;
pool.query("DELETE FROM men WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/adminmen");
});
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/deleteadminkinder/:id", function(req, res){
        
const id = req.params.id;
pool.query("DELETE FROM kinder WHERE id=?", [id], function(err, data) {
  if(err) return console.log(err);
  res.redirect("/adminkinder");
});
});


/////////Nodemailer
let user = undefined

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/registration', jsonParser, (req, res) => { 
 

user = req.body.orderlist
catalog = req.body.userdata
tu = JSON.parse(user) 
vin = JSON.parse('{"' + catalog.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })  
console.log(vin)
console.log(tu)


var out = '';
//var cena = '';
//var kolih = '';
for(var key in tu) {
  out+='Название: ' +tu[key].title + ' Стоимость: ' +tu[key].price + ' Количество: ' +tu[key].count + '<br>' + '<img src="'+tu[key].img+'">' + '<hr>';
  //cena+='Стоимость: ' +tu[key].price + '<br>';
  //kolih+='Количество: ' +tu[key].count + '<br>';

}
console.log(out);
//console.log(cena);
//console.log(kolih)
 


if(!req.body.orderlist || !req.body.userdata) return res.sendStatus(400)  

  const message = {        
        to:[ 
          MAIL.mail,
          vin.user_mail
        ],
        subject: 'Avrora-Shop',
        html:` ное письмо не требует ответа.<p>
  
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
        <p style="color: rgb(212, 2, 195);"><b>Данные для оформления товара:</b></p>



    <ul>
        <li><b>Имя:</b> ${vin.user_name}</li>
        <li><b>Email:</b> <b>${vin.user_mail}</b></li>
        <li><b>Tel:</b> <b>${vin.user_phone}</b></li>
       
        
    </ul>

    <img src="https://mirplatev.ru/wa-data/public/shop/products/94/20/2094/images/2530/2530.750x0.jpg" alt="" border="0" width="250" height="270" style="display:block;">

    <ul>
    <li style="color: rgb(212, 2, 195);"><b>Данные отправкой почтой</b></li>
    <li><b>Место:</b> ${vin.user_address}</li>
   
</ul>


${out}




   ${req.body.promo ? `Покупатель подписан на рассылку ваших акций и предложений,
чтобы отписатть его от рассылки перейдите по ссылке
    <a href="http://localhost:3001/unsubscribe/${req.body.userdata.user_mail}">отписаться от рассылки</a>` : ''} 
     
    `  
  }

    

    //mailer(message) 
    //user = req.body 
    //res.redirect('/registration') 
   
    const mas  = 'Заказ принят в обработку!'
    

    mailer(message) 
    user = req.body 
    res.json(mas)
    console.log(mas)
})

//response.json(request.mes.body); // отправляем пришедший ответ обратно
   // console.log(mes)

//const mes = 'Заказ принят в обработку!';

//app.get('/registration', (req, res) => { 
   // if(typeof user !== 'object') return res.message(__dirname + '/registration.html')   
   // res.mes
    // console.log(mes)
//})

app.get('/unsubscribe/:email', (req, res) => {
    console.log(`${req.params.email} unsubscribed`)
    res.send(`Ваш email: ${req.params.email} удален из списка рассылки!`)
})
/////////Nodemailer

app.get('*', (req, res) => {
  res.redirect("/404.html")
})

app.listen(
  /* 3000, function(){
  console.log("Сервер ожидает подключения... http://localhost:3000");
} */
);


