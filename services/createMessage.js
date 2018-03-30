class CreateMessage {
        static CreateSms(phoneNumber, text){
                return 'sms://' + phoneNumber + 
                      '?body=' + text;
        }
        static CreateWhatsapp(phoneNumber, text){
                return 'https://api.whatsapp.com/send?phone=' + phoneNumber + 
                        '&text=' + text;
        }
        static  CreateGmail(sender, subject, body){
                return 'https://mail.google.com/mail/' +
                '?view=cm&fs=1&to=' + sender +
                '&su=' + subject +
                '&body=' + body;
        }
        static  CreateEmail(sender, cc, bbc, subject, body){
                return 'mailto:' + sender + 
                '?cc' + cc +
                '&bcc=' + bbc +
                '&Subject=' + subject + 
                '&body=' + body;
        }
}
 
module.exports = CreateMessage;