import cacheAssetsAsync from './cacheAssetsAsync';

export async function loadAssets() {
    try {
        await cacheAssetsAsync({
            images: [
                require('../assets/images/logo.png'),
                require('../assets/images/facebook.png'),
                require('../assets/images/google.png'),
                require('../assets/images/barcode.png'),
                require('../assets/images/visa.png'),
                require('../assets/images/favorite.png'),
                require('../assets/images/modal/ico_checked.png'),
                require('../assets/images/modal/ico_warning.png'),
                require('../assets/images/gps.png'),
                require('../assets/images/apple.png'),
                require('../assets/images/alert-circle.png'),
                require('../assets/images/circle-warning.png'),
                require('../assets/icons/bag.png'),
                require('../assets/icons/email.png'),
                require('../assets/icons/alert.png'),
                require('../assets/icons/card.png'),
                require('../assets/icons/location.png'),
                require('../assets/icons/tends.png'),
                require('../assets/icons/parking.png'),
                require('../assets/icons/services.png'),
                require('../assets/icons/home.png'),
                require('../assets/icons/finance.png'),
                require('../assets/icons/shopping.png'),
                require('../assets/icons/profile.png'),
                require('../assets/icons/home_selected.png'),
                require('../assets/icons/finance_selected.png'),
                require('../assets/icons/shopping_selected.png'),
                require('../assets/icons/profile_selected.png'),
                require('../assets/icons/user_outlined.png'),
                require('../assets/icons/lock.png'),
                require('../assets/icons/alert.svg'),
            ],
        });
        return true;
    } catch (e) {
        return false;
    } finally {
    }
}

