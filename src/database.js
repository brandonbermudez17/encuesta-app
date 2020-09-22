const { Pool } = require('pg');


let pool = null;
let Config = {
    host: 'localhost',
    user: 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    database: 'encuesta',
    port: 5432,
    password: 'joker'
}

function getConnection() {
    if (pool === null) {
        pool = new Pool(Config);
    }

    return pool;
}

const closeDB = () => {
    pool.end().then(() => console.log('pool has ended'))
}

const fetchEncuestas = async () => {
    const conn = getConnection()
    
    const encuestas = await conn.query('select * from Obtener_todas_las_encuestas()')

    return encuestas.rows;
}

const getEncuesta = async (id) => {
    const conn = getConnection()
    
    const encuestas = await conn.query('select * from Obtener_encuesta($1)',[id])

    return encuestas.rows[0];
}

const getRespuestas = async () => {
    const conn = getConnection()
    const res = await conn.query('select to_json(a.*) as respuestas from obtener_todas_las_resp() as a;')
    return res.rows[0];
}

const setEstudiante = async (data) => {
    const conn = getConnection()
    conn.query()
}

module.exports = {
    getConnection,
    closeDB,
    fetchEncuestas,
    getEncuesta,
    getRespuestas
}
