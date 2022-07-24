import { IsDefined, IsNotEmpty } from 'class-validator';
import { LocationsEntity } from '../entities/location.entity';
import { OriginEntity } from '../entities/origin.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;
  @IsDefined()
  status: string;
  @IsDefined()
  species: string;
  @IsDefined()
  type: string;
  @IsDefined()
  gender: string;
  @IsDefined()
  origin: OriginEntity[];
  @IsDefined()
  location: LocationsEntity[];
  @IsDefined()
  image: string;
  @IsDefined()
  episode: string[];
  @IsDefined()
  url: string;
  @IsDefined()
  created: string;
}
