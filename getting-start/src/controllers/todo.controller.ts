import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Todomodel} from '../models';
import {TodomodelRepository} from '../repositories';

export class TodoController {
  constructor(
    @repository(TodomodelRepository)
    public todomodelRepository : TodomodelRepository,
  ) {}

  @post('/todomodels')
  @response(200, {
    description: 'Todomodel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todomodel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomodel, {
            title: 'NewTodomodel',
            exclude: ['id'],
          }),
        },
      },
    })
    todomodel: Omit<Todomodel, 'id'>,
  ): Promise<Todomodel> {
    return this.todomodelRepository.create(todomodel);
  }

  @get('/todomodels/count')
  @response(200, {
    description: 'Todomodel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todomodel) where?: Where<Todomodel>,
  ): Promise<Count> {
    return this.todomodelRepository.count(where);
  }

  @get('/todomodels')
  @response(200, {
    description: 'Array of Todomodel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todomodel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todomodel) filter?: Filter<Todomodel>,
  ): Promise<Todomodel[]> {
    return this.todomodelRepository.find(filter);
  }

  @patch('/todomodels')
  @response(200, {
    description: 'Todomodel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomodel, {partial: true}),
        },
      },
    })
    todomodel: Todomodel,
    @param.where(Todomodel) where?: Where<Todomodel>,
  ): Promise<Count> {
    return this.todomodelRepository.updateAll(todomodel, where);
  }

  @get('/todomodels/{id}')
  @response(200, {
    description: 'Todomodel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todomodel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Todomodel, {exclude: 'where'}) filter?: FilterExcludingWhere<Todomodel>
  ): Promise<Todomodel> {
    return this.todomodelRepository.findById(id, filter);
  }

  @patch('/todomodels/{id}')
  @response(204, {
    description: 'Todomodel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomodel, {partial: true}),
        },
      },
    })
    todomodel: Todomodel,
  ): Promise<void> {
    await this.todomodelRepository.updateById(id, todomodel);
  }

  @put('/todomodels/{id}')
  @response(204, {
    description: 'Todomodel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todomodel: Todomodel,
  ): Promise<void> {
    await this.todomodelRepository.replaceById(id, todomodel);
  }

  @del('/todomodels/{id}')
  @response(204, {
    description: 'Todomodel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.todomodelRepository.deleteById(id);
  }
}
