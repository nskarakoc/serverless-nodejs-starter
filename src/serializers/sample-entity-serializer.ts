import { SampleEntityType } from '../domains/sample-domain/api/sample-entity-type';
import { SampleEntity } from '../domains/sample-domain/typeorm/sample-entity';

export class SampleEntitySerializer {
  static builSampleEntityType({ sampleEntity }: { sampleEntity: SampleEntity }): SampleEntityType {
    return {
      id: sampleEntity.id,
      name: sampleEntity.name,
    };
  }
}
