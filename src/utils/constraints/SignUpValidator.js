import i18n from '../../config/i18n';

export const SignUpValidator = {
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
    password: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_in.error_password_empty')}`
        },
        length: {
            minimum: 8,
            maximun: 20,
            message: `^${i18n.t('pages.sign_in.error_password_malformed')}`
        },
        format: {
            pattern: /^[A-Za-z\d]{8,20}$/,
            message: `^${i18n.t('pages.sign_in.error_password_number_lack')}`
        },
    },
    confirmPassword: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_in.error_password_empty')}`
        },
        length: {
            minimum: 8,
            maximun: 20,
            message: `^${i18n.t('pages.sign_in.error_password_malformed')}`
        },
        format: {
            pattern: /^[A-Za-z\d]{8,20}$/,
            message: `^${i18n.t('pages.sign_in.error_password_number_lack')}`
        },
    }
};
