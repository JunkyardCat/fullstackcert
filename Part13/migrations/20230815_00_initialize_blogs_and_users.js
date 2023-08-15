const {DataTypes, Sequelize} = require('sequelize')
const { sequelize} = require('../util/db')

module.exports = {
    up: async ({context: qeuryInterface}) => {
        await qeuryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
            
        }
        )
        await qeuryInterface.createTable('users',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate:{
                    isEmail: true
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }

        }
        )
        await qeuryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model: 'users', key: 'id'}
        })
    },
    down: async ({context: qeuryInterface}) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }
}