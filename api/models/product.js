module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            unique: true,
            allowNull: false
        },
        productImage: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        cloudId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });
    return Product;
};