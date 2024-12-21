const cookieObj = typeof window === 'undefined' ? require('next/headers') : require('universal-cookie');

import en from '../../public/locales/en.json';
import bd from '../../public/locales/bn.json';
import fr from '../../public/locales/fr.json';
import ru from '../../public/locales/ru.json';

const langObj: any = { en,  fr,  ru, bd };

const getLang = () => {
    let lang = null;
    if (typeof window !== 'undefined') {
        const cookies = new cookieObj.default(null, { path: '/' });
        lang = cookies.get('i18nextLng');
    } else {
        const cookies = cookieObj.cookies();
        lang = cookies.get('i18nextLng')?.value;
    }
    return lang;
};

export const getTranslation = () => {
    const lang = getLang();
    const data: any = langObj[lang || 'en'];

    const t = (key: string) => {
        return data[key] ? data[key] : key;
    };

    const initLocale = (themeLocale: string) => {
        const lang = getLang();
        i18n.changeLanguage(lang || themeLocale);
    };

    const i18n = {
        language: lang,
        changeLanguage: (lang: string) => {
            const cookies = new cookieObj.default(null, { path: '/' });
            cookies.set('i18nextLng', lang);
        },
    };

    return { t, i18n, initLocale };
};
