import {COMPANY} from '../../utils/urls';

export const apiListCompany = (axios) => {
    return axios.get(COMPANY);
};