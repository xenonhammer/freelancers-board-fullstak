import {
  ENABLE_KWORK,
  DISABLE_KWORK,
  START_DOWNLOADING_KWORK,
  DISABLE_FREELANCE_RU,
  ENABLE_FREELANCE_RU,
  START_DOWNLOADING_FREELANCE_RU
} from '../types';

export const switchDataAction = {
  kwork: {
    setEnabled: () => ({ type: ENABLE_KWORK }),
    setDisable: () => ({ type: DISABLE_KWORK }),
    setStartDownload: () => ({ type: START_DOWNLOADING_KWORK })
  },
  freelanceRu: {
    setEnabled: () => ({ type: ENABLE_FREELANCE_RU }),
    setDisable: () => ({ type: DISABLE_FREELANCE_RU }),
    setStartDownload: () => ({ type: START_DOWNLOADING_FREELANCE_RU })
  }
}