module.exports = (sequelize , datatype) =>{
    return sequelize.define('Ecole' , {
        id :{
            type:datatype.INTEGER,
            autoIncrement :true,
            primaryKey :true
        },
        nom :{
            type:datatype.STRING,
            allowNull :true
        },
        UtilisateurId : {
            type:datatype.INTEGER,
            allowNull: false
        }
    })
} 