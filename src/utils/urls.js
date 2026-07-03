import { baseUrl, baseUrlPayment } from '../config/constants';

export const SIGN_IN = `${baseUrl}/login/`;
export const UPDATE_USER = `${baseUrl}/user/`;
export const DOCUMENT_TYPES = `${baseUrl}/general/documenttype/`;
export const SIGN_UP = `${baseUrl}/signin/`;
export const SIGN_UP_SOCIAL = `${baseUrl}/signin/`;
export const RECOVER_PASSWORD = `${baseUrl}/password/email/`;
export const CHANGE_PASSWORD = `${baseUrl}/general/updatepassword/`;
export const DETAILS = `${baseUrl}/details/`;
export const SIGN_OUT = `${baseUrl}/logout/`;
export const COMPANY = `${baseUrl}/general/company/`;
export const GET_PARKING_LIST = `${baseUrl}/general/parking/`;
export const GET_TENDS_LIST = `${baseUrl}/general/company/`;
export const GET_SHOP_HISTORY = `${baseUrl}/general/invoice/list`;
export const GET_INVOICE_DETAILS = `${baseUrl}/general/invoice/`;
export const GET_LOCALE_BY_SHOP = `${baseUrl}/general/branchoffice/locales/`;
export const GET_PRODUCT_DETAIL = `${baseUrl}/general/product/productdetail/`;
export const SCANN_PRODUCT_DETAIL = `${baseUrl}/general/product/productbarcode/`;
export const GET_SERVICES_LIST = `${baseUrl}/general/service/`;
export const CHANGE_TOKEN = `${baseUrl}/general/activetoken/`;
export const GENERATE_TOKEN = `${baseUrl}/general/createtoken/`;
export const VALIDATE_TOKEN = `${baseUrl}/general/validatetoken/`;
export const VALIDATE_COUPON = `${baseUrl}/general/discount/validatecoupon/`;
export const SAVE_TEMP_PURCHASE = `${baseUrl}/general/product/temporaryproduct`;
export const SAVE_PURCHASE = `${baseUrl}/general/invoice`;
export const PAY_WITH_CARD = `${baseUrl}/general/card/pay/`;
export const VALIDATE_INVOICE = `${baseUrl}/general/invoice/validate`;
export const VALIDATED_LIST = `${baseUrl}/general/invoice/getvalidated/`;

export const CREATE_INCIDENT = `${baseUrl}/general/incidence/`;
export const INCIDENTS_BY_USER = `${baseUrl}/general/incidence/byuser/`;
export const CREATE_SUGGESTION = `${baseUrl}/general/suggestion/`;
export const INCIDENT_TYPES = `${baseUrl}/general/incidence/types/`;
export const INCIDENT_DETAILS = `${baseUrl}/general/incidence/detail/`;

//PAYMENT
export const REGISTER_CARD = `${baseUrlPayment}/web-payment/`;

export const GET_CARDS_LIST = `${baseUrl}/general/card`;
export const CARD_FAVORIT = `${baseUrl}/general/card/favourite`;

export const ALLOWED_URLS_WHEN_NOT_LOGGED_IN = [
    SIGN_IN,
    SIGN_UP,
    RECOVER_PASSWORD,
]