import { validateOrReject } from 'class-validator';
import { EntityManager } from 'typeorm';
import { sampleEntityRepository } from '../repositories/typeorm-repository';
import { TypeormUtil } from '../util/typeorm-util';

export class SampleService {
  static async runComplexLogic() {
    const sampleEntities = await sampleEntityRepository.find();

    if (!sampleEntities.length) {
      return;
    }

    const dataSource = await TypeormUtil.getDataSource();
    await dataSource.transaction(async (entityManager: EntityManager) => {
      const sampleEntity = sampleEntities[0];
      sampleEntity.name = 'new name';
      await validateOrReject(sampleEntity);
      await entityManager.save(sampleEntity);
    });
  }
}
