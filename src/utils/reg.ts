/* eslint-disable unicorn/better-regex */
export const REG_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const REG_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[ !#$%&*?@^-]).{8,}$/;
export const REG_FULL_NAME = /^[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF\s]{1,50}$/;
// export const REG_PHONE = /^(\+?84|0?)(3|5|7|8|9)[0-9]{8}$/;
export const REG_PHONE = /^0([357-9])\d{8}$/;
export const REG_SPACE = /^\S*$/
