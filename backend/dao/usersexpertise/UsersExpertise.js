module.exports = (sequelize, DataTypes) => {

  const UsersExpertise = sequelize.define('UsersExpertise', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wordId: {
      type: DataTypes.INTEGER,
      references: 'Tags',
      referencesKey: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'UsersExpertise',
    timestamps: true,

  });

  return UsersExpertise;
};
