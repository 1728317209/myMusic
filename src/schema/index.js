import { schema } from 'normalizr';

const MusicSchema = new schema.Entity('musicEntities', {}, { idAttribute: 'id' });
export const musicListSchema = new schema.Array(MusicSchema);

export const UserSchema = new schema.Entity('UserEntities', {}, { idAttribute: 'mid' });
