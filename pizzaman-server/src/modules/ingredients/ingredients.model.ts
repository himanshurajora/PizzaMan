import { Table, Model, Column, DataType } from 'sequelize-typescript'


// Ingredents model for sequelize ORM

@Table
export class Ingredents extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;
}