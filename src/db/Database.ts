import { DataSource } from 'typeorm';
import User from '../entities/User';
import Product from '../entities/Product';
import ProductPurchase from '../entities/ProductPurchase';

class Database {

  public static createDataSource() {
    return new DataSource({
      type: 'postgres',
    //TODO: VARIBLE DE ENTORNO QUE APUNTE AL NOMBRE DEL CONTENEDOR
      host: 'localhost',
      //TODO: VARIABLE DE ENTORNO
      port: 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      entities: [User, Product, ProductPurchase]
    });
  }
}

export default Database;