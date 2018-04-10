import _ from 'lodash';

class CreateLinks {
    static CreateSms(phoneNumbers, text){
        let phones = phoneNumbers.join(';');
        
        if(phones){
            return 'sms://' + phones + 
                  '?body=' + text;
        } else {
            return '';
        }
    }

    static CreateWhatsapp(phoneNumber, text){
        if(phoneNumber){
            let phone = '972' + phoneNumber.substring(1)
            return 'https://api.whatsapp.com/send?phone=' + phone + 
                    '&text=' + text;
        } else {
            return '';
        }
        
    }
    static  CreateGmail(sender, subject, body){
            return 'https://mail.google.com/mail/' +
            '?view=cm&fs=1&to=' + sender +
            '&su=' + subject +
            '&body=' + body;
    }
    static  CreateEmail(senders, ccs, bccs, subject, body){
        if(senders){
            let sender = senders.join(';');   
            let cc = '';
            if(ccs) {
                cc = ccs.join(';');
            }
            let bcc = '';
            if(bccs) {
                bcc = bccs.join(';');
            }

            return 'mailto:' + sender + 
                '?cc' + cc +
                '&bcc=' + bccs +
                '&Subject=' + subject + 
                '&body=' + body;
        } else {
            return '';
        }
    }
}

export default CreateLinks;