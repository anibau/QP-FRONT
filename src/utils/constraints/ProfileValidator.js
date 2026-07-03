import i18n from '../../config/i18n';

export const ProfileValidator = {
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
    birthday: {
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
    phone: {
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
