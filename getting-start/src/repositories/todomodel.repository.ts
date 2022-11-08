import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todomodel, TodomodelRelations} from '../models';

export class TodomodelRepository extends DefaultCrudRepository<
  Todomodel,
  typeof Todomodel.prototype.id,
  TodomodelRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todomodel, dataSource);
  }
}
