import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSampleEntityBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}
