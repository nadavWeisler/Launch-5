export default [
    { label: 'שם', name: 'name', type: 'text' },
    { label: 'תיאור', name: 'desc' , type: 'text'},
    { label: 'מספר נייד', name: 'phoneNumber', type: 'text' },
    { label: 'טקסט הודעה', name: 'textBody' , type: 'text', componentClass: 'textarea'},
    { label: 'כתובת דואר אלקטרוני', name: "emailSender", type: 'text'},
    { label: 'נושא דואר אלקטרוני', name: "emailSubject", type: 'text'},
    { label: 'טקסט דואר אלקטרוני', name: "emailBody", type: 'text', componentClass: 'textarea'}
];