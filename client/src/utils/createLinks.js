class CreateLinks {
    static getProperText(text) {
        var returnText = text;
        while(returnText.indexOf('\n') !== -1){
            returnText = returnText.replace('\n', '%0A');
        }
        return returnText;
    }

    static CreateSms(phoneNumbers, text){
        let phones = phoneNumbers.join(';');
        console.log(text);
        text = this.getProperText(text);
        console.log(text);
        if(phones){
            return 'sms://' + phones + 
                  '?body=' + text;
        } else {
            return '';
        }
    }

    static CreateWhatsapp(phoneNumber, text){
        if(phoneNumber && phoneNumber.length > 0) {
            text = this.getProperText(text);
            let phone = '972' + phoneNumber[0].substring(1)
            return 'https://api.whatsapp.com/send?phone=' + phone + 
                    '&text=' + text;
        } else {
            return '';
        }
        
    }
    
    static CreateGmail(senders, ccs, bccs, subject, body){
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

            var properbody = this.getProperText(body);

            return 'https://mail.google.com/mail/' +
                '?view=cm&fs=1&to=' + sender +
                '&cc=' + cc +
                '&bcc=' + bcc + 
                '&su=' + subject +
                '&body=' + properbody;
        } else {
            return '';
        }
    }

    static CreateEmail(senders, ccs, bccs, subject, body){
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

            var properbody = this.getProperText(body);

            return 'mailto:' + sender + 
                '?cc=' + cc +
                '&bcc=' + bcc +
                '&Subject=' + subject + 
                '&body=' + properbody;
        } else {
            return '';
        }
    }
}

export default CreateLinks;