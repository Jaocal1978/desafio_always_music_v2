const { Pool } = require("pg");

const config = {
    host : process.env.HOST,
    port : process.env.PORT,
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASS
}

const pool = new Pool(config);

/* Alumnos en mi base de datos
[
  [ 6, 'Brian May', '12.345.678-9', 'Guitarra', 7 ],
  [ 7, 'Jorge Gonzalez', '10.854.965-4', 'Guitarra', 10 ],
  [ 9, 'Madonna', '9.999.632-9', 'vocal', 10 ],
  [ 8, 'Juan Perez', '15.698.874-5', 'Trompeta', 8 ],
  [ 10, 'Alanis Morissette', '11.658.365-9', 'Guitarra', 10 ],
  [ 15, 'Carmen Araya', '14.357.957-4', 'Bateria', 4 ],
  [ 18, 'Juan Abarca', '16.369.258-8', 'Xilofono', 6 ]
]*/

//Ej: buscar
const buscarEstudiantes = async () =>
{
    try
    {
        const querySearch = "SELECT * FROM clientes";
        const queryConfig = {
            text : querySearch,
            values : [],
            rowMode : "array"
        }
        const response = await pool.query(queryConfig);
        console.log(response.rows);
    }
    catch (error)
    {
        const { code } = error;
        console.log(code);
    }
}

//Ej: nuevo 'Guillermo Castro' '19.587.654-6' 'bajo' 5
const ingresarEstudiante = async () =>
{
    try 
    {
        const queryInsert = "INSERT INTO clientes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *";
        const queryConfig = {
            text : queryInsert,
            values : [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])],
            rowMode : "array"
        }
        const response = await pool.query(queryConfig);
        console.log('Estudiante Agregado con Exito.');
        console.log(response.rows);
    } 
    catch (error) 
    {
        const { code } = error;
        console.log(code);
    }
}

//Ej: editar 'Guillermo Castro' '19.587.654-6' 'clarinete' 2 22
const editarEstudiante = async () =>
{
    try 
    {
        const queryUpdate = "UPDATE clientes SET nombre=$1, rut=$2, curso=$3, nivel=$4 WHERE id = $5 RETURNING *";
        const queryConfig = {
            text : queryUpdate,
            values : [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6]), Number(process.argv[7])],
            rowMode : "array"
        }
        const response = await pool.query(queryConfig);
        console.log("Estudiante Actualizado con exito.");
        console.log(response.rows);
    } 
    catch (error) 
    {
        const { code } = error;
        console.log(code);
    }
}

//Ej: buscar_estudiante '19.587.654-6'
const buscarEstudiante = async () =>
{
    try 
    {
        const querySearch = "SELECT * FROM clientes WHERE rut = $1";
        const queryConfig = {
            text : querySearch,
            values : [process.argv[3]],
            rowMode : "array"
        }
        const response = await pool.query(queryConfig);
        console.log(response.rows);
    } 
    catch (error) 
    {
        const { code } = error;
        console.log(code);
    }
}

//Ej: eliminar '19.587.654-6'
const eliminarEstudiante = async () =>
{
    try 
    {
        const queryDelete = "DELETE FROM clientes WHERE rut = $1";
        const queryConfig = {
            text : queryDelete,
            values : [process.argv[3]],
            rowMode : "array"
        }
        const response = await pool.query(queryConfig);
        console.log("Estudiante Eliminado Con Exito.");
        console.log(response.rows);
    } 
    catch (error) 
    {
        const { code } = error;
        return code;
    }
}

//ingresarEstudiante();
//buscarEstudiantes();
buscarEstudiante();
//editarEstudiante();
//eliminarEstudiante();

