import { performance } from 'perf_hooks';
import { exit } from 'process';
import { Logger } from '../util/logger';
import { sampleEntityRepository } from '../repositories/typeorm-repository';

const main = async () => {
  const sampleEntities = await sampleEntityRepository.find();
  Logger.debug('Sample entities:', sampleEntities);
};

const scriptExecutionStart = performance.now();
main()
  .then(() => {
    const scriptExecutionElapsedTimeMillis = performance.now() - scriptExecutionStart;
    Logger.info(`Successfully executed script in ${scriptExecutionElapsedTimeMillis}ms`);
  })
  .catch((error) => {
    Logger.error('Failed to execute script:', error);
    exit(1);
  });
