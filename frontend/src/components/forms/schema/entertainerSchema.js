import {
  required,
  stringValidation,
  autocompleteValidation,
  positiveNumberValidation,
  optionalValidation,
  urlValidation,
  multiSelectValidation
} from './schema-helpers';

/////////////////////////
// Schema
////////////////////////
export const entertainerDetailsSchema = {
  stage_name: stringValidation('Stage Name'),
  location: stringValidation('Location'),
  type: stringValidation('Entertainer Type'),
  lga: required('Local Government'),
  city: required('City'),
  year_started: positiveNumberValidation('Started Year'),
  willing_to_travel: stringValidation('Willing to travel'),
  available_for: autocompleteValidation('Available for')
};

export const addEntertainerSchema = {
  type: stringValidation('Entertainer Type'),
  event_type: stringValidation('Event Type'),
  genre: multiSelectValidation('Genre'),
  language: multiSelectValidation('Language'),
  audience: stringValidation('audience'),
  age_group: stringValidation('Age Group'),
  base_budget: stringValidation('Lowest Budget'),
  highest_budget: stringValidation('Highest Budget'),
  place: stringValidation('Place of Event'),
  special_events: optionalValidation(stringValidation('Special Events', 20))
};

export const videoSchema = {
  youtube_url: urlValidation('Youtube URL'),
  title: stringValidation('Title')
};
