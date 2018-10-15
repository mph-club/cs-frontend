export function CreateUserSessionProperties(payload) {
    return {
        type: "CreateUserSession",
        payload: payload,
    };
}

export function RemoveUserSessionProperties() {
    return {
        type: "RemoveUserSession",
        payload: {},
    };
}