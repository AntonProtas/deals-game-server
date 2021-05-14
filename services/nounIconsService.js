import NounIconsService from 'the-noun-project';

import { nounIconsConfig } from '../env-dev.js';

const nounIcons = new NounIconsService(nounIconsConfig);

export const getIconsByName = (name = 'habit', count = 12) => {
  try {
    return new Promise((resolve, reject) => {
      nounIcons.getIconsByTerm(name, { limit: count }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.icons);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export default nounIcons;
