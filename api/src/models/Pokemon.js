const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {

    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Vida: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    Ataque: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    Defensa: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    Velocidad: {
      type: DataTypes.FLOAT
    },

    Altura: {
      type: DataTypes.FLOAT
    },

    Peso: {
      type: DataTypes.FLOAT
    }
  });
};
