import i18n from '../../config/i18n';

export const SignUpValidatorSocial = {
    firstName: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_names_empty')}`
        },
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_last_names_empty')}`
        },
    },
    documentType: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_doc_type_empty')}`
        },
    },
    birthDay: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_birthday_empty')}`
        },
    },
    email: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_email_empty')}`
        },
        email: {
            message: `^${i18n.t('pages.sign_up.error_email_malformed')}`
        }
    },
    phoneNumber: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_phone_empty')}`
        },
        length: {
            is: 9,
            message: `^${i18n.t('pages.sign_up.error_phone_malformed')}`
        }
    },
};
