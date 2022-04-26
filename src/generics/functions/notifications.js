import {notification} from "antd";

export function onError() {
    openWarningNotification('top');
}

const openWarningNotification = (placement) => {
    notification.error({
        message: `Ops!`,
        description:
            'Ocorreu um erro. Tente novamente mais tarde.',
        placement,
        duration: 1.8,
    });
};

export const openSuccessNotification = (placement, obj, action) => {
    notification.success({
        message: `Sucesso!`,
        description:
            obj + ' ' + action + ' com sucesso!',
        placement,
        duration: 1.8,
    });
};
