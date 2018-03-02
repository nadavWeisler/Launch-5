function CreateSms(phoneNumber, text){
  return 'sms://' + phoneNumber + 
        '?body=' + text;
}
function CreateWhatsapp(text){
    return 'whatsapp://send' + 
            '?text=' + text; 
}
function CreateEmailGmail(sender, subject, body){
    return 'https://mail.google.com/mail/' +
            '?view=cm&fs=1&to=' + sender +
            '&su=' + subject +
            '&body=' + body;
}
function CreateEmailOutlook(sender, subject, body){
    return 'mailto:' + sender + 
            '?Subject=' + subject + 
            '&body=' + body;

}