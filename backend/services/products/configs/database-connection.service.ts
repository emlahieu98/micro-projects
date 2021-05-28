import {Injectable} from '@nestjs/common'
import {TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { ProductEntity } from 'src/entities/product.entity'

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host:  process.env.DATABASE_HOST || "localhost" ,
      port: Number(process.env.DATABASE_PORT) || 3307,
      username: process.env.DATABASE_USER || 'admin',
      password: process.env.DATABASE_PASSWORD || "1",
      database: process.env.DATABASE_DB || "projects",
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
    //  logging: true,
      entities: [ProductEntity]
      
    }
  }
}
