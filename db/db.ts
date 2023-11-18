const Sequelize = require('sequelize');

//Login no banco de dados (mudar isso quando for para um servidor externo)
const sequelize = new Sequelize('b0mzsqefyp8zw52c49ph', 'urle9lhvyruhp9ge', '7KPm6PvS1MnOgloQABsg', {dialect: 'mysql', host:'b0mzsqefyp8zw52c49ph-mysql.services.clever-cloud.com'});
//const sequelize = new Sequelize('dbEtec', 'root', '', {dialect: 'mysql', host:'localhost'});

export default sequelize;