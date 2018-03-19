const re = /^05\d([-]{0,1})\d{7}$/;

export default (phone) => {
    return re.test(phone);
}