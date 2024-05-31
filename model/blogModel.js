module.exports =(sequelize,DataTypes)=>{
    const Blog = sequelize.define("blog",{
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