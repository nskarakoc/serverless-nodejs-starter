import { plainToClass } from 'class-transformer';
import { Request, Router } from 'express';
import { CreateSampleEntityBody } from '../domains/sample-domain/api/create-sample-entity-body';
import { SampleEntityType } from '../domains/sample-domain/api/sample-entity-type';
import { SampleEntity } from '../domains/sample-domain/typeorm/sample-entity';
import { sampleEntityRepository } from '../repositories/typeorm-repository';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { requestHandlerMiddleware } from '../middlewares/request-handler-middleware';
import { SampleEntitySerializer } from '../serializers/sample-entity-serializer';
import { CreatedObjectType } from '../domains/sample-domain/api/created-object-type';
import { NotFoundError } from '../domains/sample-domain/errors/not-found-error';

const router = Router();

router.get(
  '/',
  requestHandlerMiddleware<SampleEntityType[]>(async () => {
    const sampleEntities = await sampleEntityRepository.find();

    return sampleEntities.map((se) =>
      SampleEntitySerializer.builSampleEntityType({
        sampleEntity: se,
      }),
    );
  }),
);

router.get(
  '/:sampleEntityId',
  requestHandlerMiddleware<SampleEntityType>(async (req: Request) => {
    const { sampleEntityId } = req.params;

    const sampleEntity = await sampleEntityRepository.findOne({
      where: {
        id: sampleEntityId,
      },
    });

    if (!sampleEntity) {
      throw new NotFoundError(`Sample entity with id ${sampleEntityId} not found`);
    }

    return SampleEntitySerializer.builSampleEntityType({
      sampleEntity,
    });
  }),
);

router.post(
  '/',
  validatorMiddleware(CreateSampleEntityBody),
  requestHandlerMiddleware<CreatedObjectType>(
    async (req: Request<any, any, CreateSampleEntityBody>) => {
      const sampleEntity = plainToClass(SampleEntity, {
        name: req.body.name,
      });
      await sampleEntityRepository.save(sampleEntity);

      return {
        id: sampleEntity.id,
      };
    },
  ),
);

export { router as sampleRouter };
