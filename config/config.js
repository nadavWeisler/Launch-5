var env = process.env.NODE_ENV || 'development';

//'mongodb://WinItDbUser:99Herzog@ds133465.mlab.com:33465/winitdb';

if(env === 'development' || env === 'test'){
    var config = require('./config.json');
    var keys = require('./keys');
    var envConfig = config[env];
    
    Object.keys(envConfig).forEach(((key) => {
        process.env[key] = envConfig[key];
    }));
}

