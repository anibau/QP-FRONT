import i18n from '../../config/i18n';

export const RecoverPasswordValidator = {
    documentNumber: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_doc_number_empty')}`
        },
    },
    birthDay: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_birthday_empty')}`
        },
    },
};
