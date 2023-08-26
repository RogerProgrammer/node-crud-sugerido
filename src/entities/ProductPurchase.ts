import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, BaseEntity } from "typeorm";
import  Product  from "./Product";
import User from "./User";

@Entity()
class ProductPurchase extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  //TODO: REVISAR TODAS LAS COLUMNAS DE LAS BASES DE DATOS SON SNAKECASE
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", name: 'purchase_date' })
  purchaseDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User, user => user.purchases)
  user: User;
}

export default ProductPurchase;