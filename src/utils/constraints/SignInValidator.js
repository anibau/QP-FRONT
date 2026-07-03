import i18n from '../../config/i18n';

export const SignInValidator = {
    email: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_up.error_email_empty')}`
        },
        email: {
            message: `^${i18n.t('pages.sign_up.error_email_malformed')}`
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: `^${i18n.t('pages.sign_in.error_password_empty')}`
        },
        length: {
            minimum: 6,
            maximun: 20,
            message: `^${i18n.t('pages.sign_in.error_password_malformed')}`
        },
        /* format: {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
            message: `^${i18n.t('pages.sign_in.error_password_number_lack')}`
        }, */
    },
};