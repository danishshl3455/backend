module.exports = {
    HOST: '20.198.114.109',
    USER: 'root',
    PASSWORD: 'edra@k',
    DB: 'qms360',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
