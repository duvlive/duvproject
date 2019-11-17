import {
  stringValidation,
  autocompleteValidation,
  positiveNumberValidation,
  urlValidation
} from './schema-helpers';

/////////////////////////
// Schema
////////////////////////
export const entertainerDetailsSchema = {
  stage_name: stringValidation('Stage Name'),
  location: stringValidation('Location'),
  year_started: positiveNumberValidation('Started Year'),
  willing_to_travel: stringValidation('Willing to travel'),
  available_for: autocompleteValidation('Available for')
};

export const videoSchema = {
  youtube_url: urlValidation('Youtube URL'),
  title: stringValidation('Title')
};
