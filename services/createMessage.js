class CreateMessage {
        static CreateSms(phoneNumber, text){
                return 'sms://' + phoneNumber + 
                      '?body=' + text;
        }
        static CreateWhatsapp(phoneNumber, text){
                return 'https://api.whatsapp.com/send?phone=' + phoneNumber + 
                        '&text=' + text;
        }
        static  CreateEmail(sender, subject, body, type){
                if (type == 0){
                        return 'https://mail.google.com/mail/' +
                        '?view=cm&fs=1&to=' + sender +
                        '&su=' + subject +
                        '&body=' + body;
                } 
                else if(type == 1){
                        return 'mailto:' + sender + 
                        '?Subject=' + subject + 
                        '&body=' + body;
                } 
                else {
                        return '';
                }
        }
}
 
module.exports = CreateMessage;