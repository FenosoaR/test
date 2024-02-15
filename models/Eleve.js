module.exports = (sequelize , datatype)=>{
    return sequelize.define('Eleve' , {
        id:{
            type: datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nom :{
            type:datatype.STRING,
            allowNull : false
        },
        prenom :{
            type:datatype.STRING,
            allowNull :false
        },
        classe : {
            type:datatype.STRING,
            allowNull:false
        },
        age : {
            type :datatype.INTEGER,
            allowNull:false
        },
        UtilisateurId : {
            type :datatype.INTEGER,
        },
        EcoleId : {
            type:datatype.INTEGER
        }
    })
}