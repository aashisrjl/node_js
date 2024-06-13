module.exports =(sequelize,DataTypes)=>{
    const Blog = sequelize.define("blog",{
        img:{
            type: DataTypes.STRING
        },
        title:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        subtitle:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        description:{
            type:DataTypes.TEXT,
            allowNULL: false
        }
    })
    return Blog;
}