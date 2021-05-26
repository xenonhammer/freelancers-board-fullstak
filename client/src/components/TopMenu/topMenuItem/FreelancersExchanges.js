import { switchDataAction } from '../../../redux/actions/swichDataAction';

const { kwork, freelanceRu } = switchDataAction;
export default function freelancersExchanges (state, dispatch) {
  return [
    {
      name: 'KWORK',
      enable: state.enableKwork,
      setDisable: () => dispatch(kwork.setDisable()),
      setEnabled: () => dispatch(kwork.setEnabled()),
      setStartDownload: () => dispatch(kwork.setStartDownload()),
      key: 'kwork'
    },
    {
      name: 'FREELANCE.RU',
      enable: state.enableFreelanceRu,
      setDisable: () => dispatch(freelanceRu.setDisable()),
      setEnabled: () => dispatch(freelanceRu.setEnabled()),
      setStartDownload: () => dispatch(freelanceRu.setStartDownload()),
      key: 'freelanceRu'
    },
  ];
};